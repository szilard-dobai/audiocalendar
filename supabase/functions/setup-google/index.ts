import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { google } from "https://esm.sh/googleapis@126.0.1";
import { corsHeaders } from "../_shared/cors.ts";
import { createResponse } from "../_shared/createResponse.ts";
import { postErrorToSlack } from "../_shared/slackClient.ts";
import { createSupabaseServerClient } from "../_shared/supabaseClient.ts";
import { getUserFromRequest } from "../_shared/user.ts";
import { createCalendar, getCalendar } from "./calendar.ts";
import { parseBody } from "./parseBody.ts";

const GOOGLE_CLIENT_ID = Deno.env.get("VITE_GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = Deno.env.get("VITE_GOOGLE_CLIENT_SECRET");

serve(async (req) => {
  // This is needed in order to invoke function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { code, redirectUri } = await parseBody(req);

    const supabase = createSupabaseServerClient();
    const user = await getUserFromRequest(req);

    const oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      redirectUri
    );
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    await supabase.from("google_tokens").upsert(
      {
        userId: user.id,
        accessToken: tokens.access_token,
        expiresAt: tokens.expiry_date,
        expiresIn: 3600,
        refreshToken: tokens.refresh_token,
        redirectUri,
      },
      { onConflict: "userId" }
    );
    await supabase
      .from("notifications")
      .update({ resolved: true })
      .eq("userId", user.id)
      .eq("type", "INVALID_GOOGLE_REFRESH_TOKEN");

    const gcal = google.calendar({ version: "v3", auth: oauth2Client });

    const { data: previousCalendar } = await supabase
      .from("google_calendars")
      .select("*")
      .eq("userId", user.id)
      .maybeSingle();
    if (previousCalendar) {
      const { data } = await getCalendar(gcal, previousCalendar.id);
      if (data.id) {
        return createResponse({
          code: 200,
          data: { calendarId: previousCalendar.id },
        });
      }
    }

    const { data: newCalendar } = await createCalendar(gcal);
    if (!newCalendar?.id) {
      throw new Error(`Error creating calendar for ${user.id}`);
    }
    await supabase
      .from("google_calendars")
      .upsert({ id: newCalendar.id, userId: user.id }, { onConflict: "userId" })
      .throwOnError();

    return createResponse({
      code: 200,
      data: { calendarId: newCalendar.id },
    });
  } catch (error) {
    await postErrorToSlack("setup-google", error.message);

    console.error(error.message);

    return createResponse({
      code: 400,
      data: { error: error.message },
    });
  }
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/setup-google' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
