"use server";
import { submitInvestorProfile } from "@/app/actions/user";

export async function onSubmitAction(formData: FormData) {
  return submitInvestorProfile(formData);
}
