import { type Database } from "@audiocalendar/types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const createSupabaseClient = () => {
  // NOTE: Without this weird hack, building the app crashes...
  const cookiesData = cookies();
  return createRouteHandlerClient<Database>({ cookies: () => cookiesData });
};

export const createSupabaseAdminClient = () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
};
