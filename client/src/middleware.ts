import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Redirect to home if user is attempting to reset password without having a session
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  // if (!session && req.nextUrl.pathname === "/auth/reset-password") {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // // if user is signed in and the current path is / redirect the user to /account
  // if (user && req.nextUrl.pathname !== "/account") {
  //   return NextResponse.redirect(new URL("/account", req.url));
  // }

  // if user is not signed in and the current path is /account redirect the user to /auth
  if (!user && req.nextUrl.pathname === "/account") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return res;
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
