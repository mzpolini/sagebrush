import { z } from "zod";

const investmentRanges = [
  "under_50k",
  "50k_100k",
  "100k_250k",
  "250k_500k",
  "500k_1m",
  "over_1m",
] as const;

const investmentStyles = [
  "passive",
  "active",
  "strategic",
  "angel",
  "venture",
] as const;

const riskTolerances = [
  "conservative",
  "moderate",
  "aggressive",
  "speculative",
] as const;

const locations = ["west_coast", "east_coast", "midwest"] as const;

export const schema = z.object({
  investmentRange: z
    .enum(investmentRanges, {
      required_error: "Please select an investment range",
      invalid_type_error: "Please select a valid investment range",
    })
    .optional(),
  investmentStyle: z
    .enum(investmentStyles, {
      required_error: "Please select an investment style",
      invalid_type_error: "Please select a valid investment style",
    })
    .optional(),
  preferredLocations: z
    .array(z.enum(locations))
    .min(1, {
      message: "Please select at least one preferred location",
    })
    .max(3, {
      message: "You can select up to 3 locations",
    }),
  accreditedStatus: z.boolean().default(false),
  investmentGoals: z
    .string({ required_error: "Investment goals are required" })
    .trim()
    .min(50, {
      message: "Please provide at least 50 characters describing your investment goals",
    })
    .max(2000, {
      message: "Investment goals cannot exceed 2000 characters",
    }),
  investmentHistory: z
    .string({ required_error: "Investment history is required" })
    .trim()
    .min(50, {
      message: "Please provide at least 50 characters describing your investment history",
    })
    .max(2000, {
      message: "Investment history cannot exceed 2000 characters",
    }),
  riskTolerance: z
    .enum(riskTolerances, {
      required_error: "Please select your risk tolerance",
      invalid_type_error: "Please select a valid risk tolerance",
    })
    .optional(),
});

export type FormData = z.infer<typeof schema>;
