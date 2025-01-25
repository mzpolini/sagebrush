"use server";
import { schema } from "./formSchema";

export type FormState = {
  message: string;
};

export async function onSubmitAction(data: FormData): Promise<FormState> {
  "use server";
  const formData = Object.fromEntries(data);
  const parsed = schema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Invalid form data",
    };
  }

  if (parsed.data.lastName.includes("a")) {
    return {
      message: "Invalid lastName",
    };
  }

  return { message: "User registered" };
}
