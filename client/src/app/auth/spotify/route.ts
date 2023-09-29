import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { PostSpotifyInput } from "./schema";
import type { Database } from "@audiocalendar/types";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { access_token, expires, expires_in, refresh_token } =
      PostSpotifyInput.parse(body);

    const supabase = createRouteHandlerClient<Database>({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    await supabase.from("spotify_tokens").upsert(
      {
        userId: session!.user.id,
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: expires,
        expiresIn: expires_in,
      },
      { onConflict: "userId" }
    );
    await supabase
      .from("notifications")
      .update({ resolved: true })
      .eq("userId", session!.user.id)
      .eq("type", "INVALID_SPOTIFY_REFRESH_TOKEN");

    return NextResponse.redirect(new URL("/account", req.url));
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};
