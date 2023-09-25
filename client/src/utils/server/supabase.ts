import { Database } from "@audiocalendar/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const createSupabaseClient = () => {
  // NOTE: Without this weird hack, building the app crashes...
  const cookiesData = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookiesData });
};
