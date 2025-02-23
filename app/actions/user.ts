"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/db/drizzle";
import { users } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function syncUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db
    .insert(users)
    .values({
      clerkId: userId,
      email: "", // You'll get this from the form
    })
    .onConflictDoNothing()
    .returning();

  return user[0];
}

export async function updateUserProfile(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const data = Object.fromEntries(formData);

  // First try to insert a new user
  const newUser = await db
    .insert(users)
    .values({
      clerkId: userId,
      email: data.email as string,
      firstName: data.firstName as string,
      lastName: data.lastName as string,
      username: data.username as string,
      about: data.about as string,
      address: data.address as string,
      city: data.city as string,
      state: data.state as string,
      zip: data.zip as string,
      country: data.country as string,
    })
    .onConflictDoUpdate({
      target: users.clerkId,
      set: {
        email: data.email as string,
        firstName: data.firstName as string,
        lastName: data.lastName as string,
        username: data.username as string,
        about: data.about as string,
        address: data.address as string,
        city: data.city as string,
        state: data.state as string,
        zip: data.zip as string,
        country: data.country as string,
        updatedAt: new Date(),
      },
    })
    .returning();

  return newUser[0];
}

export async function testInsertUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const testUser = await db
    .insert(users)
    .values({
      clerkId: userId,
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      username: "testuser",
      about: "This is a test user",
      address: "123 Test St",
      city: "Test City",
      state: "TS",
      zip: "12345",
      country: "Test Country",
    })
    .onConflictDoUpdate({
      target: users.clerkId,
      set: {
        email: "test@example.com",
        updatedAt: new Date(),
      },
    })
    .returning();

  return testUser[0];
}
