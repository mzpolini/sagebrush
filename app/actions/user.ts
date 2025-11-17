"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/db/drizzle";
import { users, investorProfiles, applicantProfiles } from "@/app/db/schema";
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

export async function getUserProfile(clerkId?: string) {
  // If no clerkId provided, get from auth
  const { userId: authUserId } = await auth();
  const userId = clerkId || authUserId;

  if (!userId) return null;

  // Security check: only allow users to fetch their own profile
  if (clerkId && clerkId !== authUserId) {
    throw new Error("Unauthorized: Cannot access other user's profile");
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  return user[0] || null;
}

export async function getApplicantProfile(clerkId?: string) {
  // If no clerkId provided, get from auth
  const { userId: authUserId } = await auth();
  const userId = clerkId || authUserId;

  if (!userId) return null;

  // Security check: only allow users to fetch their own profile
  if (clerkId && clerkId !== authUserId) {
    throw new Error("Unauthorized: Cannot access other user's profile");
  }

  // First get the user's UUID from their clerkId
  const user = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  if (!user[0]) return null;

  // Then get their applicant profile
  const profile = await db
    .select()
    .from(applicantProfiles)
    .where(eq(applicantProfiles.userId, user[0].id))
    .limit(1);

  return profile[0] || null;
}

export async function submitApplicantProfile(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be logged in to submit an application");
  }

  // Import schema dynamically to avoid circular dependencies
  const { schema } = await import("../(app)/profile/applicant/schema");

  try {
    const data = Object.fromEntries(formData.entries());

    // Server-side validation
    const validatedData = schema.parse({
      licenseType: data.licenseType,
      experience: data.experience,
      criminalHistory: data.criminalHistory || "",
      financialInvestment: data.financialInvestment,
      securityPlan: data.securityPlan,
      businessPlan: data.businessPlan,
    });

    // First get the user's UUID from their clerkId
    const user = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (!user[0]) {
      throw new Error("User not found");
    }

    // Check if profile already exists
    const existingProfile = await db
      .select()
      .from(applicantProfiles)
      .where(eq(applicantProfiles.userId, user[0].id))
      .limit(1);

    if (existingProfile[0]) {
      // Update existing profile
      await db
        .update(applicantProfiles)
        .set({
          licenseType: validatedData.licenseType,
          experience: validatedData.experience,
          criminalHistory: validatedData.criminalHistory || null,
          financialInvestment: validatedData.financialInvestment,
          securityPlan: validatedData.securityPlan,
          businessPlan: validatedData.businessPlan,
          status: "pending",
          submittedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(applicantProfiles.id, existingProfile[0].id));
    } else {
      // Create new profile
      await db.insert(applicantProfiles).values({
        userId: user[0].id,
        licenseType: validatedData.licenseType,
        experience: validatedData.experience,
        criminalHistory: validatedData.criminalHistory || null,
        financialInvestment: validatedData.financialInvestment,
        securityPlan: validatedData.securityPlan,
        businessPlan: validatedData.businessPlan,
        status: "pending",
        submittedAt: new Date(),
      });
    }

    revalidatePath("/profile");
    redirect("/profile");
  } catch (error) {
    console.error("Error submitting application:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to submit application. Please try again.");
  }
}

export async function getInvestorProfile(clerkId?: string) {
  // If no clerkId provided, get from auth
  const { userId: authUserId } = await auth();
  const userId = clerkId || authUserId;

  if (!userId) return null;

  // Security check: only allow users to fetch their own profile
  if (clerkId && clerkId !== authUserId) {
    throw new Error("Unauthorized: Cannot access other user's profile");
  }

  // First get the user's UUID from their clerkId
  const user = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  if (!user[0]) return null;

  // Then get their investor profile
  const profile = await db
    .select()
    .from(investorProfiles)
    .where(eq(investorProfiles.userId, user[0].id))
    .limit(1);

  return profile[0] || null;
}

export async function submitInvestorProfile(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be logged in to submit an investor profile");
  }

  // Import schema dynamically to avoid circular dependencies
  const { schema } = await import("../(app)/profile/investor/schema");

  try {
    const data = Object.fromEntries(formData.entries());

    // Convert preferredLocations from FormData to array
    const preferredLocationsEntries = Array.from(formData.entries())
      .filter(([key]) => key === "preferredLocations")
      .map(([, value]) => value as string);

    // Server-side validation
    const validatedData = schema.parse({
      investmentRange: data.investmentRange,
      investmentStyle: data.investmentStyle,
      preferredLocations: preferredLocationsEntries,
      accreditedStatus: data.accreditedStatus === "true",
      investmentGoals: data.investmentGoals,
      investmentHistory: data.investmentHistory,
      riskTolerance: data.riskTolerance,
    });

    // First get the user's UUID from their clerkId
    const user = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (!user[0]) {
      throw new Error("User not found");
    }

    // Check if profile already exists
    const existingProfile = await db
      .select()
      .from(investorProfiles)
      .where(eq(investorProfiles.userId, user[0].id))
      .limit(1);

    if (existingProfile[0]) {
      // Update existing profile
      await db
        .update(investorProfiles)
        .set({
          investmentRange: validatedData.investmentRange,
          investmentStyle: validatedData.investmentStyle,
          preferredLocations: validatedData.preferredLocations,
          accreditedStatus: validatedData.accreditedStatus,
          investmentGoals: validatedData.investmentGoals,
          investmentHistory: validatedData.investmentHistory,
          riskTolerance: validatedData.riskTolerance,
          updatedAt: new Date(),
        })
        .where(eq(investorProfiles.id, existingProfile[0].id));
    } else {
      // Create new profile
      await db.insert(investorProfiles).values({
        userId: user[0].id,
        investmentRange: validatedData.investmentRange,
        investmentStyle: validatedData.investmentStyle,
        preferredLocations: validatedData.preferredLocations,
        accreditedStatus: validatedData.accreditedStatus,
        investmentGoals: validatedData.investmentGoals,
        investmentHistory: validatedData.investmentHistory,
        riskTolerance: validatedData.riskTolerance,
      });
    }

    revalidatePath("/profile");
    redirect("/profile");
  } catch (error) {
    console.error("Error submitting investor profile:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to submit investor profile. Please try again.");
  }
}
