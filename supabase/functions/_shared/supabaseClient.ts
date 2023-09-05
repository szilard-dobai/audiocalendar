import {
  SupabaseClient,
  createClient,
} from "https://esm.sh/@supabase/supabase-js@2.31.0";
import { type Database as DB } from "../../../packages/types/database.ts";

export type Client = SupabaseClient<DB>;
export type Database = DB;

export const createSupabaseClient = (token: string) => {
  const supabaseClient = createClient<DB>(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: token } } }
  );

  return supabaseClient;
};

export const createSupabaseServerClient = () => {
  const supabaseClient = createClient<DB>(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  return supabaseClient;
};