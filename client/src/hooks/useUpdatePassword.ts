import { createClient } from "@/utils/client/supabase";
import { useMutation } from "@tanstack/react-query";

export type UpdatePasswordInput = {
  password: string;
};

const useUpdatePassword = () => {
  const supabase = createClient();

  return useMutation<void, string, UpdatePasswordInput>({
    mutationFn: async ({ password }) => {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        throw error.message;
      }
    },
    retry: 0,
  });
};

export default useUpdatePassword;
