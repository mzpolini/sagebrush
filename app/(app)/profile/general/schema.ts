import { z } from "zod";

// Regex patterns for validation
const namePattern = /^[a-zA-Z\s'-]+$/;
const usernamePattern = /^[a-zA-Z0-9_-]+$/;
const zipPattern = /^[0-9]{5}(-[0-9]{4})?$|^[A-Z][0-9][A-Z]\s?[0-9][A-Z][0-9]$/; // US ZIP or Canadian postal code

export const schema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(2, {
      message: "First name must be at least 2 characters long",
    })
    .max(50, {
      message: "First name cannot exceed 50 characters",
    })
    .regex(namePattern, {
      message: "First name can only contain letters, spaces, hyphens, and apostrophes",
    }),
  lastName: z
    .string({ required_error: "Last name is required" })
    .trim()
    .min(2, {
      message: "Last name must be at least 2 characters long",
    })
    .max(50, {
      message: "Last name cannot exceed 50 characters",
    })
    .regex(namePattern, {
      message: "Last name can only contain letters, spaces, hyphens, and apostrophes",
    }),
  email: z
    .string({ required_error: "Email address is required" })
    .trim()
    .email({
      message: "Please enter a valid email address",
    })
    .max(255, {
      message: "Email cannot exceed 255 characters",
    }),
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(30, {
      message: "Username cannot exceed 30 characters",
    })
    .regex(usernamePattern, {
      message: "Username can only contain letters, numbers, underscores, and hyphens",
    }),
  about: z
    .string({ required_error: "About section is required" })
    .trim()
    .min(10, {
      message: "Please write at least 10 characters about yourself",
    })
    .max(1000, {
      message: "Bio cannot exceed 1000 characters",
    }),
  address: z
    .string({ required_error: "Street address is required" })
    .trim()
    .min(5, {
      message: "Please enter a valid street address",
    })
    .max(255, {
      message: "Address cannot exceed 255 characters",
    }),
  city: z
    .string({ required_error: "City is required" })
    .trim()
    .min(2, {
      message: "City name must be at least 2 characters long",
    })
    .max(100, {
      message: "City name cannot exceed 100 characters",
    })
    .regex(namePattern, {
      message: "City name can only contain letters, spaces, hyphens, and apostrophes",
    }),
  state: z
    .string({ required_error: "State/Province is required" })
    .trim()
    .min(2, {
      message: "State must be at least 2 characters long",
    })
    .max(100, {
      message: "State cannot exceed 100 characters",
    }),
  zip: z
    .string({ required_error: "Postal code is required" })
    .trim()
    .regex(zipPattern, {
      message: "Please enter a valid postal code (e.g., 12345 or A1A 1A1)",
    }),
  country: z
    .string({ required_error: "Country is required" })
    .trim()
    .min(1, {
      message: "Please select a country",
    }),
});

export type FormData = z.infer<typeof schema>;
