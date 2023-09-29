import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import dayjs from "https://esm.sh/dayjs@1.11.9";
import { google } from "https://esm.sh/googleapis@126.0.1";
import { corsHeaders } from "../_shared/cors.ts";
import { createResponse } from "../_shared/createResponse.ts";
import { createSlackClient } from "../_shared/slackClient.ts";
import { createSupabaseServerClient } from "../_shared/supabaseClient.ts";
import { verifyPromises } from "../_shared/verifyPromises.ts";
import { getCalendars, getSongs, getTokens } from "./helpers.ts";

const GOOGLE_CLIENT_ID = Deno.env.get("VITE_GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = Deno.env.get("VITE_GOOGLE_CLIENT_SECRET");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
const PUSH_TO_CALENDAR_SECRET = Deno.env.get("VITE_PUSH_TO_CALENDAR_SECRET");

const validateRequest = (headers: Headers) => {
  if (
    headers.get("Authorization") !== `Bearer ${SUPABASE_ANON_KEY}` &&
    headers.get("WWW-Authenticate") !== `Bearer ${PUSH_TO_CALENDAR_SECRET}`
  ) {
    throw new Error("Unauthorized!");
  }
};

serve(async (req) => {
  // This is needed in order to invoke function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    validateRequest(req.headers);

    const supabase = createSupabaseServerClient();

    const songsMap = await getSongs(supabase);
    const calendarsMap = await getCalendars(supabase);
    const tokens = await getTokens(supabase);

    const gCal = google.calendar("v3");

    const promises = await Promise.allSettled(
      tokens.map(async (token) => {
        const userId = token.userId;
        const songs = songsMap[userId];
        const { id: calendarId } = calendarsMap[userId];

        if (!songs || !songs.length || !calendarId) {
          return;
        }

        const gAuth = new google.auth.OAuth2(
          GOOGLE_CLIENT_ID,
          GOOGLE_CLIENT_SECRET
        );
        gAuth.setCredentials({
          access_token: token?.accessToken,
          refresh_token: token?.refreshToken,
        });
        gAuth.on("tokens", async (tokens) => {
          console.log(`Refreshed access token for ${userId}`);
          await supabase.from("google_tokens").upsert(
            {
              userId: userId,
              accessToken: tokens.access_token,
              expiresAt: tokens.expiry_date,
              refreshToken: tokens.refresh_token,
            },
            { onConflict: "userId" }
          );
        });

        for (const song of songs) {
          const playedAt = dayjs(song.playedAt);
          try {
            await gCal.events.insert({
              calendarId,
              auth: gAuth,
              requestBody: {
                start: {
                  dateTime: playedAt
                    .subtract(song.songDuration, "ms")
                    .toISOString(),
                },
                end: { dateTime: playedAt.toISOString() },
                description: `Artist: <a href="${song.artistUrl}">${song.artist}</a>\nAlbum: <a href="${song.albumUrl}">${song.album}</a>\nSong: <a href="${song.songUrl}">${song.song}</a>`,
                reminders: { useDefault: false, overrides: [] },
                summary: `${song.artist}: ${song.song}`,
                colorId: Math.floor(Math.random() * 11 + 1).toString(),
              },
            });
            await supabase
              .from("history")
              .update({ addedToCalendar: true })
              .eq("id", song.id);
          } catch (e) {
            throw new Error(
              `Failed pushing song to calendar for ${userId}: ${e.message}`
            );
          }
        }
      })
    );

    verifyPromises(promises);

    return createResponse({
      code: 200,
      data: null,
    });
  } catch (error) {
    const slack = createSlackClient();
    await slack.chat.postMessage({
      text: `Uh oh, \`push-to-calendar\` encountered an error: ${error.message}!`,
      channel: "C05QUF7G30F",
    });

    console.error(error.message);

    return createResponse({
      code: 400,
      data: { error: error.message },
    });
  }
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/push-to-calendar' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
