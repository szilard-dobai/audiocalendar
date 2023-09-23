import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);

  const code = searchParams.get("code");
  console.log("code", code);
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const next = searchParams.get("next");
  return NextResponse.redirect(new URL(next ? next : "/account", req.url));
};
