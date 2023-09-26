import { z } from "zod";

export const PostSpotifyInput = z.object({
  access_token: z.string(),
  expires: z.string(),
  expires_in: z.string(),
  refresh_token: z.string(),
});
export type PostSpotifyInput = z.infer<typeof PostSpotifyInput>;
