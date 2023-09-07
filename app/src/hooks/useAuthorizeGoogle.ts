import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import useSupabase from "./useSupabase";

export const useAuthorizeGoogle = () => {
  const supabase = useSupabase();
  const authorizeGoogle = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar",
    flow: "auth-code",
    onSuccess: (response) =>
      supabase.functions.invoke("setup-google", {
        body: JSON.stringify({
          ...response,
          redirectUri: window.location.origin,
        }),
      }),
  });

  return useMutation({
    mutationFn: () => {
      authorizeGoogle();
      return Promise.resolve();
    },
    retry: false,
  });
};
