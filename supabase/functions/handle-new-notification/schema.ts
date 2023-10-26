import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

export const Notification = z.object({
  createdAt: z.string(),
  id: z.string(),
  message: z.string(),
  resolved: z.boolean(),
  type: z.string(),
  userId: z.string(),
});
export const NewNotificationInput = z.object({
  type: z.string(),
  table: z.string(),
  schema: z.string(),
  record: Notification,
  old_record: z.null(),
});

export type Notification = z.infer<typeof Notification>;
export type NewNotificationInput = z.infer<typeof NewNotificationInput>;
