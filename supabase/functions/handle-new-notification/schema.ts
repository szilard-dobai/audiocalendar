import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import type { Notification as TNotification } from "../_shared/supabaseClient.ts";
import type { TypeToZod } from "../_shared/zod.ts";

export const Notification = z.object<TypeToZod<TNotification>>({
  createdAt: z.string(),
  id: z.string(),
  message: z.string(),
  resolved: z.boolean(),
  type: z.enum([
    "INVALID_SPOTIFY_REFRESH_TOKEN",
    "INVALID_GOOGLE_REFRESH_TOKEN",
    "OTHER",
  ]),
  userId: z.string(),
});
export const NewNotificationInput = z.object({
  type: z.string(),
  table: z.string(),
  schema: z.string(),
  record: Notification,
  old_record: z.null(),
});

export type NewNotificationInput = z.infer<typeof NewNotificationInput>;
