"use client";

import QueryKeys from "@/hooks/queryKeys";
import { Scopes, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useGrantSpotifyAccess = () => {
  const queryClient = useQueryClient();

  return useMutation<void, string>({
    mutationFn: async () => {
      await SpotifyApi.performUserAuthorization(
        process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        `${window.location.origin}/account/settings`,
        Scopes.userRecents,
        `${window.location.origin}/auth/spotify`
      ).catch((error) => {
        throw `Oh no! An error occured: ${error.message}`;
      });
    },
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: QueryKeys.currentUser() }),
        queryClient.invalidateQueries({ queryKey: QueryKeys.notifications() }),
      ]),
    retry: 0,
  });
};

export default useGrantSpotifyAccess;
