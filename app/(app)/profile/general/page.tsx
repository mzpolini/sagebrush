import { auth } from "@clerk/nextjs/server";
import { getUserProfile } from "@/app/actions/user";
import GeneralForm from "./form";

export default async function GeneralPage() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const userData = await getUserProfile(userId);
  console.log("userData", userData);
  // Only pass the user fields needed by the form
  const initialData = userData
    ? {
        id: String(userData.id),
        clerkId: userData.clerkId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        about: userData.about,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        zip: userData.zip,
        country: userData.country,
      }
    : undefined;

  return <GeneralForm initialData={initialData} />;
}
