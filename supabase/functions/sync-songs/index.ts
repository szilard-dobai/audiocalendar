import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createResponse } from "../_shared/createResponse.ts";
import { createSupabaseServerClient } from "../_shared/supabaseClient.ts";
import { getUserFromRequest } from "../_shared/user.ts";
import { SpotifyApi } from "https://esm.sh/@spotify/web-api-ts-sdk";

serve(async (req) => {
  // This is needed in order to invoke function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // const client = createSupabaseServerClient();
    const user = await getUserFromRequest(req);

    console.log(user);

    return createResponse({
      code: 200,
      data: { user },
    });
  } catch (error) {
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
