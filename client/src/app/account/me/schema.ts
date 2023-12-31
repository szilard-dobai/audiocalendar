import { z } from "zod";

export const CurrentUser = z.object({
  id: z.string(),
  email: z.string(),
  created_at: z.string(),
  preferences: z.object({
    emailNotifications: z.boolean(),
  }),
  hasGoogleAccess: z.boolean(),
  hasSpotifyAccess: z.boolean(),
});

export const GetCurrentUserOutput = z.union([
  CurrentUser,
  z.object({ error: z.string() }),
]);

export type CurrentUser = z.infer<typeof CurrentUser>;
export type GetCurrentUserOutput = z.infer<typeof GetCurrentUserOutput>;
