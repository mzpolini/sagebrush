"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/db/drizzle";
import { users, investorProfiles, applicants } from "@/app/db/schema";
import { eq } from "drizzle-orm";
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
  if (!userId) return null;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .execute();

  if (!user?.[0]) return null;

  return {
    ...user[0],
  };
}

export async function getApplicantProfile(userId: string) {
  if (!userId) return null;

  const applications = await db
    .select()
    .from(applicants)
    .where(eq(applicants.userId, userId))
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

export async function getInvestorProfile(userId: string) {
  if (!userId) return null;

  const profiles = await db
    .select()
    .from(investorProfiles)
    .where(eq(investorProfiles.userId, userId))
    .limit(1);

  return profiles.length > 0 ? profiles[0] : null;
}

export async function submitInvestorProfile(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be logged in to submit an investor profile");
  }

  const data = Object.fromEntries(formData.entries());

  // Extract the profile ID from the URL
  const url = new URL(formData.get("url") as string);
  const profileId = url.pathname.split("/")[2];

  // Convert preferredLocations from FormData to array
  const preferredLocationsEntries = Array.from(formData.entries())
    .filter(([key]) => key === "preferredLocations")
    .map(([, value]) => value as string);

  try {
    // Check if profile already exists
    const existingProfile = await getInvestorProfile(userId);

    if (existingProfile) {
      // Update existing profile
      await db
        .update(investorProfiles)
        .set({
          investmentRange: data.investmentRange as string,
          investmentStyle: data.investmentStyle as string,
          preferredLocations: preferredLocationsEntries,
          accreditedStatus: data.accreditedStatus === "true",
          investmentGoals: data.investmentGoals as string,
          investmentHistory: data.investmentHistory as string,
          riskTolerance: data.riskTolerance as string,
          updatedAt: new Date(),
        })
        .where(eq(investorProfiles.id, existingProfile.id));
    } else {
      // Create new profile
      await db.insert(investorProfiles).values({
        userId, // This is the Clerk user ID
        investmentRange: data.investmentRange as string,
        investmentStyle: data.investmentStyle as string,
        preferredLocations: preferredLocationsEntries,
        accreditedStatus: data.accreditedStatus === "true",
        investmentGoals: data.investmentGoals as string,
        investmentHistory: data.investmentHistory as string,
        riskTolerance: data.riskTolerance as string,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    revalidatePath(`/profile/${profileId}/investor`);
    redirect(`/profile/${profileId}/dashboard`);
  } catch (error) {
    console.error("Error submitting investor profile:", error);
    throw new Error("Failed to submit investor profile. Please try again.");
  }
}
