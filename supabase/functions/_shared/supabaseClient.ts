import {
  SupabaseClient,
  createClient,
} from "https://esm.sh/@supabase/supabase-js@2.31.0";
import { type Database as DB } from "../../../packages/types/database.ts";

export type Client = SupabaseClient<DB>;
export type Database = DB;

export type Song = Database["public"]["Tables"]["history"]["Row"];
export type Calendar = Database["public"]["Tables"]["google_calendars"]["Row"];
export type SpotifyToken =
  Database["public"]["Tables"]["spotify_tokens"]["Row"];

export const createSupabaseClient = (token: string) => {
  const supabaseClient = createClient<DB>(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: { headers: { Authorization: token } },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  );

  return supabaseClient;
};

export const createSupabaseServerClient = () => {
  const supabaseClient = createClient<DB>(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    }
  );

  return supabaseClient;
};
