import { z } from "zod";

export const PostSpotifyInput = z.object({
  access_token: z.string(),
  expires: z.number(),
  expires_in: z.number(),
  refresh_token: z.string(),
});
export type PostSpotifyInput = z.infer<typeof PostSpotifyInput>;
