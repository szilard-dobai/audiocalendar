import { Scopes, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import useSupabase from "./useSupabase";

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

export const useAuthorizeSpotify = () => {
  const supabase = useSupabase();
  const { session } = useAuth();

  return useMutation({
    mutationFn: () =>
      SpotifyApi.performUserAuthorization(
        SPOTIFY_CLIENT_ID,
        window.location.origin,
        Scopes.userRecents,
        async ({ access_token, expires, expires_in, refresh_token }) => {
          if (!session || !session.user.id) {
            throw new Error("User must be logged in!");
          }
          await supabase.from("spotify_tokens").upsert(
            {
              userId: session.user.id,
              accessToken: access_token,
              refreshToken: refresh_token,
              expiresAt: expires,
              expiresIn: expires_in,
            },
            { onConflict: "userId" }
          );
        }
      ),
    retry: false,
  });
};
