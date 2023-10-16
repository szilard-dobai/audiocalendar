import { z } from "zod";

export const DeleteCurrentUserOutput = z.union([
  z.boolean(),
  z.object({ error: z.string() }),
]);

export type DeleteCurrentUserOutput = z.infer<typeof DeleteCurrentUserOutput>;
