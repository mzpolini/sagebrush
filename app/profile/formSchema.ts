import { z } from "zod";

export const baseProfileSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  username: z.string().min(2),
  about: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
});

export const applicantSchema = baseProfileSchema.extend({
  // Add applicant-specific fields
  experience: z.string().optional(),
});

export const investorSchema = baseProfileSchema.extend({
  // Add investor-specific fields
  investmentRange: z.string().optional(),
});
