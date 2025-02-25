"use server";
import { db } from "@/app/db/drizzle";
import { applicantProfiles } from "@/app/db/schema";
import { auth } from "@clerk/nextjs/server";

export async function onSubmitAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const data = Object.fromEntries(formData);

  const profile = await db
    .insert(applicantProfiles)
    .values({
      userId,
      experience: data.experience as string,
      skills: JSON.parse(data.skills as string),
      desiredLocation: data.desiredLocation as string,
      availability: data.availability as string,
      licensingStatus: data.licensingStatus as string,
    })
    .onConflictDoUpdate({
      target: [applicantProfiles.userId],
      set: {
        experience: data.experience as string,
        skills: JSON.parse(data.skills as string),
        desiredLocation: data.desiredLocation as string,
        availability: data.availability as string,
        licensingStatus: data.licensingStatus as string,
        updatedAt: new Date(),
      },
    })
    .returning();

  return profile[0];
}
