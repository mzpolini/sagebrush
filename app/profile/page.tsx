import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // Redirect to user's profile
  redirect(`/profile/${userId}/general`);
}
