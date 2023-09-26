import { z } from "zod";

export const dateSchema = z.union([z.string(), z.date()]);

export const CurrentUser = z.object({
  id: z.string(),
  email: z.string(),
  created_at: dateSchema,
  hasGoogleAccess: z.boolean(),
  hasSpotifyAccess: z.boolean(),
});

export const GetCurrentUserOutput = z.union([
  CurrentUser,
  z.object({ error: z.string() }),
]);

export type CurrentUser = z.infer<typeof CurrentUser>;
export type GetCurrentUserOutput = z.infer<typeof GetCurrentUserOutput>;
