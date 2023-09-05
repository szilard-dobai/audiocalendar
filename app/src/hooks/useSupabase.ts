import { useContext } from "react";
import { SupabaseContext } from "../components/SupabaseProvider";

const useSupabase = () => {
  const supabase = useContext(SupabaseContext);
  if (!supabase) {
    throw new Error("No supabase client!");
  }
  return supabase;
};

export default useSupabase;
