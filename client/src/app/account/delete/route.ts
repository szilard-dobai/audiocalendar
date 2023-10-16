import { NextResponse } from "next/server";
import { deleteCurrentUser } from "./deleteCurrentUser";

export const DELETE = async () => {
  try {
    await deleteCurrentUser();
    return NextResponse.json(true);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};
