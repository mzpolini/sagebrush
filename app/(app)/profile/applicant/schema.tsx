import { z } from "zod";

const licenseTypes = ["cultivation", "processing", "retail", "distribution", "testing"] as const;

export const schema = z.object({
  licenseType: z
    .enum(licenseTypes, {
      required_error: "Please select a license type",
      invalid_type_error: "Please select a valid license type",
    }),
  experience: z
    .string({ required_error: "Industry experience is required" })
    .trim()
    .min(50, {
      message: "Please provide at least 50 characters describing your experience",
    })
    .max(2000, {
      message: "Experience description cannot exceed 2000 characters",
    }),
  criminalHistory: z
    .string()
    .trim()
    .max(2000, {
      message: "Criminal history cannot exceed 2000 characters",
    })
    .optional()
    .or(z.literal("")),
  financialInvestment: z
    .string({ required_error: "Financial investment plan is required" })
    .trim()
    .min(50, {
      message: "Please provide at least 50 characters describing your financial investment plan",
    })
    .max(2000, {
      message: "Financial investment description cannot exceed 2000 characters",
    }),
  securityPlan: z
    .string({ required_error: "Security plan is required" })
    .trim()
    .min(50, {
      message: "Please provide at least 50 characters describing your security plan",
    })
    .max(2000, {
      message: "Security plan cannot exceed 2000 characters",
    }),
  businessPlan: z
    .string({ required_error: "Business plan is required" })
    .trim()
    .min(100, {
      message: "Please provide at least 100 characters describing your business plan",
    })
    .max(5000, {
      message: "Business plan cannot exceed 5000 characters",
    }),
});

export type FormData = z.infer<typeof schema>;
