const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
const SYNC_SONGS_SECRET = Deno.env.get("VITE_SYNC_SONGS_SECRET");

export const validateRequest = (headers: Headers) => {
  if (
    headers.get("Authorization") !== `Bearer ${SUPABASE_ANON_KEY}` &&
    headers.get("WWW-Authenticate") !== `Bearer ${SYNC_SONGS_SECRET}`
  ) {
    throw new Error("Unauthorized!");
  }
};
