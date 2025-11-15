import { z } from "zod";

export const schema = z.object({
  licenseType: z.string().min(1, "License type is required"),
  experience: z.string().min(1, "Experience information is required"),
  criminalHistory: z.string().optional(),
  financialInvestment: z
    .string()
    .min(1, "Financial investment information is required"),
  securityPlan: z.string().min(1, "Security plan is required"),
  businessPlan: z.string().min(1, "Business plan is required"),
});

export type FormData = z.infer<typeof schema>;
