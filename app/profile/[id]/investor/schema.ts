import { z } from "zod";

export const schema = z.object({
  investmentRange: z.string().min(1, "Investment range is required"),
  investmentStyle: z.string().min(1, "Investment style is required"),
  preferredLocations: z
    .array(z.string())
    .min(1, "At least one preferred location is required"),
  accreditedStatus: z.boolean().default(false),
  investmentGoals: z
    .string()
    .min(50, "Please provide detailed investment goals"),
  investmentHistory: z
    .string()
    .min(50, "Please provide your investment history"),
  riskTolerance: z.string().min(1, "Risk tolerance is required"),
});

export type FormData = z.infer<typeof schema>;
