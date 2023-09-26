import { Database } from "@audiocalendar/types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const createSupabaseClient = () =>
  createRouteHandlerClient<Database>({ cookies });
