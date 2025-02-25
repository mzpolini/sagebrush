"use server";

import { updateUserProfile } from "@/app/actions/user";
import { schema } from "./schema";
import { z } from "zod";

export async function onSubmitAction(
  prevState: { message: string },
  data: z.output<typeof schema>
): Promise<{ message: string }> {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    await updateUserProfile(formData);
    return { message: "Profile updated successfully" };
  } catch (error) {
    return { message: (error as Error).message };
  }
}
