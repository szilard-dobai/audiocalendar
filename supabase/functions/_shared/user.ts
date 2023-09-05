import { createSupabaseClient } from "./supabaseClient.ts";

export const getUserFromRequest = async (req: Request) => {
  const client = createSupabaseClient(req.headers.get("Authorization")!);

  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated!");
  }

  return user;
};
