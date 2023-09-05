import { corsHeaders } from "./cors.ts";

export const createResponse = <T = unknown>({
  data,
  code,
}: {
  data: { error: string } | T;
  code: number;
}) =>
  new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: code,
  });
