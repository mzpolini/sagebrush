"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/db/drizzle";
import {
  users,
  applicantProfiles,
  investorProfiles,
  applicants,
} from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { query } from "@/app/db/query";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  console.log("updateUserProfile called with data", JSON.stringify(data));

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

export async function getUserProfile(userId: string) {
  const authData = await auth();

  if (!authData.userId) return null;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, authData.userId))
    .execute();

  if (!user?.[0]) return null;

  return {
    ...user[0],
  };
}

export async function getApplicantProfile(userId: string) {
  const authData = await auth();

  if (!authData.userId) return null;

  const applications = await db
    .select()
    .from(applicants)
    .where(eq(applicants.userId, authData.userId))
    .limit(1);

  return applications.length > 0 ? applications[0] : null;
}

export async function submitApplicantProfile(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be logged in to submit an application");
  }

  const data = Object.fromEntries(formData.entries());

  // Extract the profile ID from the URL
  const url = new URL(formData.get("url") as string);
  const profileId = url.pathname.split("/")[2];

  try {
    await db.insert(applicants).values({
      userId,
      profileId,
      licenseType: data.licenseType as string,
      experience: data.experience as string,
      criminalHistory: (data.criminalHistory as string) || null,
      financialInvestment: data.financialInvestment as string,
      securityPlan: data.securityPlan as string,
      businessPlan: data.businessPlan as string,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    revalidatePath(`/profile/${profileId}/applicant`);
    redirect(`/profile/${profileId}/dashboard`);
  } catch (error) {
    console.error("Error submitting application:", error);
    throw new Error("Failed to submit application. Please try again.");
  }
}
