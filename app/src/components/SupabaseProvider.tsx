import { Database } from "@audiocalendar/types";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { createContext, useMemo, type PropsWithChildren } from "react";

type SupabaseContextType = SupabaseClient | null;

const createSupabaseClient = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_API_KEY;

  return createClient<Database>(supabaseUrl, supabaseKey);
};

export const SupabaseContext = createContext<SupabaseContextType>(null);

const SupabaseProvider = ({ children }: PropsWithChildren) => {
  const Supabase = useMemo(() => createSupabaseClient(), []);
  return (
    <SupabaseContext.Provider value={Supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};

export default SupabaseProvider;
