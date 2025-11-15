import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/app/db/drizzle";
import { users } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId: clerkId } = await auth();
  const user = await currentUser();
  if (!clerkId || !user)
    return new NextResponse("Unauthorized", { status: 401 });

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId))
    .limit(1);

  if (existingUser.length > 0) {
    return NextResponse.json(existingUser[0]);
  }

  const newUser = await db
    .insert(users)
    .values({
      clerkId,
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
    })
    .returning();

  return NextResponse.json(newUser[0]);
}
