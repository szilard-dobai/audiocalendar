"use client";

import QueryKeys from "@/hooks/queryKeys";
import { createSupabaseClient } from "@/utils/client/supabase";
import { useGoogleLogin, type CodeResponse } from "@react-oauth/google";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useGrantGoogleAccess = () => {
  const supabase = createSupabaseClient();
  const queryClient = useQueryClient();

  const mutationResult = useMutation<void, string, CodeResponse>({
    mutationFn: async (response) => {
      const { error } = await supabase.functions.invoke("setup-google", {
        body: JSON.stringify({
          ...response,
          redirectUri: window.location.origin,
        }),
      });

      if (error) {
        throw `Oh no! An error occured: ${error.message}`;
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QueryKeys.currentUser() }),
    retry: 0,
  });

  const grantAccess = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar",
    flow: "auth-code",
    redirect_uri: window.location.origin,
    onSuccess: mutationResult.mutate,
  });

  return { ...mutationResult, mutate: grantAccess, mutateAsync: undefined };
};

export default useGrantGoogleAccess;
