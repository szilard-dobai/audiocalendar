import { createSupabaseClient } from "./supabaseClient.ts";

export const getUserFromRequest = async (req: Request) => {
  const client = createSupabaseClient(req.headers.get("Authorization")!);

  const {
    data: { user },
  } = await client.auth.getUser();

  const { data: userData } = await client
    .from("users")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (!user || !userData) {
    throw new Error("Not authenticated!");
  }

  return userData;
};
