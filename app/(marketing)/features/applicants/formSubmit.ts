"use server";
import { schema } from "./formSchema";

export type FormState = {
  message: string;
};

export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  "use server";

  const formData = Object.fromEntries(data);
  const parsed = schema.safeParse(formData);
  console.log("onSubmitAction server side parsed:", parsed);
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
