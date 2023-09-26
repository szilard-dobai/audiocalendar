import { createSupabaseClient } from "@/utils/handler/supabase";
import { NextResponse } from "next/server";
import { GetCurrentUserOutput } from "./schema";

export const getCurrentUser = async () => {
  const supabase = createSupabaseClient();

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

  const currentUser: GetCurrentUserOutput = {
    id: user.id,
    email: user.email!,
    created_at: user.created_at,
    hasGoogleAccess: !!googleToken && !!googleToken.accessToken,
    hasSpotifyAccess: !!spotifyToken && !!spotifyToken.accessToken,
  };
  GetCurrentUserOutput.parse(currentUser);

  return currentUser;
};

export const GET = async () => {
  try {
    const currentUser = await getCurrentUser();
    return NextResponse.json(currentUser);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};
