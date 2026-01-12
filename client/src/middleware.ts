import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request: req,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request: req,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if expired - required for Server Components
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user is not signed in and the current path is /account redirect the user to /auth
  if (!user && req.nextUrl.pathname.includes("/account")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return supabaseResponse;
};

export const config = {
  matcher: [
    "/auth/:path?",
    "/account/:path?",
    // "/account/login",
    // "/account/register",
    // "/account/reset",
    // "/account/update",
  ],
};
