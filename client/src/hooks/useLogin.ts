import { createSupabaseClient } from "@/utils/client/supabase";
import { useMutation } from "@tanstack/react-query";

export type LoginInput =
  | {
      email: string;
      password: string;
    }
  | {
      provider: "spotify" | "google";
    };

const useLogin = () => {
  const supabase = createSupabaseClient();

  const register = async (input: LoginInput) => {
    const promise =
      "provider" in input
        ? supabase.auth.signInWithOAuth({
            provider: input.provider,
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          })
        : supabase.auth.signInWithPassword({
            email: input.email,
            password: input.password,
          });

    const { data, error } = await promise;
    if (error) {
      throw error.message;
    }
    return data;
  };

  return useMutation<Awaited<ReturnType<typeof register>>, string, LoginInput>({
    mutationFn: register,
    retry: 0,
  });
};

export default useLogin;
