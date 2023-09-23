import { Database } from "@audiocalendar/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const createSupabaseClient = () =>
  createClientComponentClient<Database>();
