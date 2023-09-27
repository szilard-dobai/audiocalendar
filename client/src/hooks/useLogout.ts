import { createSupabaseClient } from "@/utils/client/supabase";
import { useMutation } from "@tanstack/react-query";

const useLogout = () => {
  const supabase = createSupabaseClient();

  return useMutation<void>({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error.message;
      }
    },
    retry: 0,
  });
};

export default useLogout;
