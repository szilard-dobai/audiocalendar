import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import dayjs from "https://esm.sh/dayjs@1.11.9";
import { corsHeaders } from "../_shared/cors.ts";
import { createResponse } from "../_shared/createResponse.ts";
import { createSlackClient } from "../_shared/slackClient.ts";
import { createSpotifyClient } from "../_shared/spotifyClient.ts";
import {
  createSupabaseServerClient,
  type Song,
} from "../_shared/supabaseClient.ts";
import { verifyPromises } from "../_shared/verifyPromises.ts";
import { mapTrackToSong } from "./mapTrackToSong.ts";
import type { QueryRange } from "./types.ts";
import { validateRequest } from "./validateRequest.ts";

// NOTE: possible optimization: have a function that queries the list of users & latest songs, then for each one calls a different function that actually does the syncing
serve(async (req) => {
  // This is needed in order to invoke function from a browser.
  // Note: might not need this actually
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    validateRequest(req.headers);

    const supabase = createSupabaseServerClient();

    const { data: latestPlayedSongs } = await supabase
      .from("latest_played_songs")
      .select("*")
      .returns<Song[]>();
    const latestUserSongMap =
      latestPlayedSongs?.reduce<Record<string, Song>>(
        (acc, it) => ({ ...acc, [it.userId]: it }),
        {}
      ) || {};

    const { data: spotifyTokens } = await supabase
      .from("spotify_tokens")
      .select("*");
    if (!spotifyTokens) {
      throw new Error("No spotify tokens!");
    }

    const promises = await Promise.allSettled(
      spotifyTokens.map(async (token) => {
        const userId = token.userId;
        const latestSong = latestUserSongMap[userId];

        const spotify = await createSpotifyClient(token);
        if (!spotify) {
          throw new Error(`Error creating spotify client for ${userId}`);
        }

        try {
          const recentlyPlayedTracksFilter: QueryRange | undefined =
            latestSong?.playedAt
              ? {
                  timestamp: dayjs(latestSong.playedAt).valueOf(),
                  type: "after",
                }
              : undefined;
          const { items: songs } = await spotify.player.getRecentlyPlayedTracks(
            50,
            recentlyPlayedTracksFilter
          );
          await supabase
            .from("history")
            .insert(
              songs.map((track) => ({ ...mapTrackToSong(track), userId }))
            );
        } catch (e) {
          throw new Error(`${e.message} for ${userId}`);
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
      text: `Uh oh, \`sync-songs\` encountered an error: ${error.message}!`,
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
// curl -i --location --request POST 'http://localhost:54321/functions/v1/sync-songs' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
