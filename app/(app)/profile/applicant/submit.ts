"use server";
import { submitApplicantProfile } from "@/app/actions/user";

export async function onSubmitAction(formData: FormData) {
  return submitApplicantProfile(formData);
}
