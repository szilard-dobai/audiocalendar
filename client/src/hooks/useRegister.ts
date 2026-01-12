import { createClient } from "@/utils/client/supabase";
import { useMutation } from "@tanstack/react-query";

export type RegisterInput =
  | {
      email: string;
      password: string;
    }
  | {
      provider: "spotify" | "google";
    };

const useRegister = () => {
  const supabase = createClient();

  const register = async (input: RegisterInput) => {
    const promise =
      "provider" in input
        ? supabase.auth.signInWithOAuth({
            provider: input.provider,
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          })
        : supabase.auth.signUp({
            email: input.email,
            password: input.password,
          });

    const { data, error } = await promise;
    if (error) {
      throw error.message;
    }
    return data;
  };

  return useMutation<
    Awaited<ReturnType<typeof register>>,
    string,
    RegisterInput
  >({
    mutationFn: register,
    retry: 0,
  });
};

export default useRegister;
