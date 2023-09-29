import { z } from "zod";

export const PostSpotifyInput = z.object({
  access_token: z.string().min(1),
  expires: z.number().min(Date.now(), "Token already expired!"),
  expires_in: z.number().min(0),
  refresh_token: z.string().min(1),
});
export type PostSpotifyInput = z.infer<typeof PostSpotifyInput>;
