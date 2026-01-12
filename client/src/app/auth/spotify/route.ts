import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { PostSpotifyInput } from "./schema";
import type { Database } from "@audiocalendar/types";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { access_token, expires, expires_in, refresh_token } =
      PostSpotifyInput.parse(body);

    const cookieStore = await cookies();
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    );
    const {
      data: { session },
    } = await supabase.auth.getSession();

    type SpotifyToken = Database["public"]["Tables"]["spotify_tokens"]["Insert"];
    const tokenData: SpotifyToken = {
      userId: session!.user.id,
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresAt: expires,
      expiresIn: expires_in,
    };

    await supabase.from("spotify_tokens").upsert(tokenData, { onConflict: "userId" });

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
