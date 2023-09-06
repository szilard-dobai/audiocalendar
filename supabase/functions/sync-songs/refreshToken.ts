import { encode } from "https://deno.land/std@0.201.0/encoding/base64.ts";

const CLIENT_ID = Deno.env.get("VITE_SPOTIFY_CLIENT_ID");
const CLIENT_SECRET = Deno.env.get("VITE_SPOTIFY_CLIENT_SECRET");

type Response = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

export const getNewAccessToken = async (
  refreshToken: string
): Promise<Response> => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: new Headers({
      Authorization: `Basic ${encode(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
  });

  const json: Response = await response.json();

  return json;
};
