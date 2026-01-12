import { createClient } from "@/utils/client/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void>({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error.message;
      }
    },
    retry: 0,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ refetchType: "none" });
      router.push("/");
    },
  });
};

export default useLogout;
