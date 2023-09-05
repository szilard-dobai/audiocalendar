import { Database } from "@audiocalendar/types";
import { createClient } from "@supabase/supabase-js";
import { useMemo } from "react";

const getSupabaseBrowserClient = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_API_KEY;

  return createClient<Database>(supabaseUrl, supabaseKey);
};

const useSupabase = () => {
  return useMemo(getSupabaseBrowserClient, []);
};

export default useSupabase;
