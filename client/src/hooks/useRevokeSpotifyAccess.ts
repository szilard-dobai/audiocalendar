"use client";

import QueryKeys from "@/hooks/queryKeys";
import { createSupabaseClient } from "@/utils/client/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRevokeSpotifyAccess = () => {
  const supabase = createSupabaseClient();
  const queryClient = useQueryClient();

  return useMutation<void, string, void>({
    mutationFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { error } = await supabase
        .from("spotify_tokens")
        .delete()
        .eq("userId", user!.id);

      if (error) {
        throw `Oh no! An error occured: ${error.message}`;
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QueryKeys.currentUser() }),
    retry: 0,
  });
};

export default useRevokeSpotifyAccess;
