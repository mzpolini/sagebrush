import { testInsertUser } from "@/app/actions/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await testInsertUser();
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
