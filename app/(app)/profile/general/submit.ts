"use server";

import { updateUserProfile } from "@/app/actions/user";
import { schema } from "./schema";
import { z } from "zod";

export async function onSubmitAction(
  prevState: { message: string; success?: boolean },
  data: z.output<typeof schema>
): Promise<{ message: string; success?: boolean }> {
  try {
    // Server-side validation
    const validatedData = schema.parse(data);

    const formData = new FormData();
    Object.entries(validatedData).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    await updateUserProfile(formData);

    return {
      message: "Profile updated successfully",
      success: true
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return {
        message: firstError.message,
        success: false
      };
    }
    return {
      message: (error as Error).message || "Failed to update profile",
      success: false
    };
  }
}
