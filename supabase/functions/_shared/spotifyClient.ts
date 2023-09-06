import {
  SpotifyApi,
  type AccessToken,
} from "https://esm.sh/@spotify/web-api-ts-sdk";
import { SpotifyToken } from "../sync-songs/types.ts";
import { encode } from "https://deno.land/std@0.201.0/encoding/base64.ts";
import dayjs from "https://esm.sh/dayjs";
import { createSupabaseServerClient } from "./supabaseClient.ts";

const CLIENT_ID = Deno.env.get("VITE_SPOTIFY_CLIENT_ID") || "";
const CLIENT_SECRET = Deno.env.get("VITE_SPOTIFY_CLIENT_SECRET") || "";

export const createSpotifyClient = async ({
  accessToken,
  refreshToken,
  expiresAt,
  expiresIn,
  userId,
}: SpotifyToken) => {
  const supabase = createSupabaseServerClient();
  const now = dayjs();
  let token: string;

  if (
    refreshToken &&
    (!expiresAt ||
      !expiresIn ||
      dayjs((expiresAt + expiresIn) * 1000).isBefore(now))
  ) {
    console.log(`Refreshed token for ${userId}`);
    const newToken = await getNewAccessToken(refreshToken);
    token = newToken.access_token;
    await supabase.from("spotify_tokens").upsert(
      {
        accessToken,
        userId: userId,
        expiresAt: now.add(newToken.expires_in, "seconds").valueOf() / 1000,
      },
      { onConflict: "userId" }
    );
  } else {
    token = accessToken!;
  }

  const spotify = SpotifyApi.withAccessToken(CLIENT_ID, {
    access_token: token,
  } as AccessToken);

  return spotify;
};

type RefreshTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};
export const getNewAccessToken = async (
  refreshToken: string
): Promise<RefreshTokenResponse> => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: new Headers({
      Authorization: `Basic ${encode(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
  });

  const json: RefreshTokenResponse = await response.json();

  return json;
};
