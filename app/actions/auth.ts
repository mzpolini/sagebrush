"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/app/db/drizzle";
import { users } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function syncUserWithDatabase() {
  const { userId: clerkId } = await auth();
  const user = await currentUser();
  if (!clerkId || !user) return null;

  // Try to find existing user
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId))
    .limit(1);

  if (existingUser.length > 0) {
    return existingUser[0];
  }

  // Create new user if doesn't exist
  const newUser = await db
    .insert(users)
    .values({
      clerkId,
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
    })
    .returning();

  return newUser[0];
}
