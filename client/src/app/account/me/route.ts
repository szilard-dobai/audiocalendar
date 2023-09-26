import { NextResponse } from "next/server";
import { getCurrentUser } from "./getCurrentUser";
import { type CurrentUser } from "./schema";

export const GET = async () => {
  try {
    const currentUser = await getCurrentUser();
    return NextResponse.json<CurrentUser>(currentUser);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};
