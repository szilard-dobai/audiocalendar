import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await req.json();

  const { access_token, expires, expires_in, refresh_token } = body;

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

  return NextResponse.redirect(new URL("/account", req.url));
};
