// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createResponse } from "../_shared/createResponse.ts";
import { postErrorToSlack } from "../_shared/slackClient.ts";
import { createSupabaseServerClient } from "../_shared/supabaseClient.ts";
import { NewNotificationInput } from "./schema.ts";
import { sendEmail } from "./sendEmail.ts";
import { validateRequest } from "./validateRequest.ts";

serve(async (req) => {
  try {
    validateRequest(req.headers);

    const body = await req.json();
    const {
      record: { message, resolved, type, userId, createdAt },
    } = NewNotificationInput.parse(body);

    if (resolved) {
      return createResponse({
        code: 200,
        data: null,
      });
    }

    const supabase = createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.admin.getUserById(userId);

    if (!user) {
      throw new Error(`Invalid user ID! Received ${userId}`);
    }
    if (!user.email) {
      throw new Error(`Missing user email address for user ${userId}`);
    }

    const { data: preferences } = await supabase
      .from("user_preferences")
      .select("*")
      .eq("id", user.id)
      .single();

    if (preferences?.emailNotifications) {
      await sendEmail({
        to: user.email,
        data: {
          createdAt,
          type,
          message,
        },
      });
    }

    return createResponse({
      code: 200,
      data: null,
    });
  } catch (error) {
    await postErrorToSlack("handle-new-notification", error.message);

    console.error(error.message);

    return createResponse({
      code: 400,
      data: { error: error.message },
    });
  }
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/handle-new-notification' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
