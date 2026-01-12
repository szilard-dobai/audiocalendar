import { createClient } from "@/utils/handler/supabase";
import { GetCurrentUserOutput } from "./schema";

export const getCurrentUser = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthenticated!");
  }

  const { data: googleToken } = await supabase
    .from("google_tokens")
    .select("*")
    .eq("userId", user.id)
    .single();
  const { data: spotifyToken } = await supabase
    .from("spotify_tokens")
    .select("*")
    .eq("userId", user.id)
    .single();
  const { data: preferences } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("id", user.id)
    .single();

  const currentUser: GetCurrentUserOutput = {
    id: user.id,
    email: user.email!,
    created_at: user.created_at,
    preferences: preferences!,
    hasGoogleAccess: !!googleToken?.refreshToken,
    hasSpotifyAccess: !!spotifyToken?.refreshToken,
  };

  const parsedUser = GetCurrentUserOutput.parse(currentUser);
  if ("error" in parsedUser) {
    throw parsedUser.error;
  }

  return parsedUser;
};
