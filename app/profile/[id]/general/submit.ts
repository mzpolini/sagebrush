"use server";

import { updateUserProfile } from "@/app/actions/user";

export async function onSubmitAction(
  prevState: { message: string },
  formData: FormData
): Promise<{ message: string }> {
  try {
    await updateUserProfile(formData);
    return { message: "Profile updated successfully" };
  } catch (error) {
    return { message: (error as Error).message };
  }
}
