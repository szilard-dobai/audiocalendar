// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createResponse } from "../_shared/createResponse.ts";
import { CHANNEL, postErrorToSlack, slack } from "../_shared/slackClient.ts";
import { validateRequest } from "./validateRequest.ts";

type InsertPayload = {
  type: "INSERT";
  table: string;
  schema: string;
  record: {
    email: string;
  };
  old_record: null;
};

serve(async (req) => {
  try {
    validateRequest(req.headers);
    const body = (await req.json()) as InsertPayload;

    await slack.chat.postMessage({
      text: `*NEW USER REGISTERED!* Say hello to ${body.record.email}. Check out the list of users <https://supabase.com/dashboard/project/avbcoobzwmrgcrvetqun/editor/16489|here>.`,
      channel: CHANNEL,
    });

    return createResponse({
      code: 200,
      data: null,
    });
  } catch (error) {
    await postErrorToSlack("notify-user-registered", error.message);

    console.error(error.message);

    return createResponse({
      code: 400,
      data: { error: error.message },
    });
  }
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/notify-user-registered' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
