import { createClient } from "@/utils/client/supabase";
import { useMutation } from "@tanstack/react-query";

export type ResetPasswordInput = {
  email: string;
};

const useResetPassword = () => {
  const supabase = createClient();

  return useMutation<void, string, ResetPasswordInput>({
    mutationFn: async ({ email }) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
      });
      if (error) {
        throw error.message;
      }
    },
    retry: 0,
  });
};

export default useResetPassword;
