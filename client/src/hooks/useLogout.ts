import { createSupabaseClient } from "@/utils/client/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
  const supabase = createSupabaseClient();
  const queryClient = useQueryClient();

  return useMutation<void>({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error.message;
      }
    },
    retry: 0,
    onSuccess: () => queryClient.invalidateQueries({ refetchType: "none" }),
  });
};

export default useLogout;
