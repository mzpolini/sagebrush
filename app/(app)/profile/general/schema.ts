import { z } from "zod";

export const schema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, {
      message: "First name must be at least 2 characters long",
    })
    .max(255, {
      message: "First name cannot exceed 255 characters",
    }),
  lastName: z
    .string()
    .trim()
    .min(2, {
      message: "Last name must be at least 2 characters long",
    })
    .max(255, {
      message: "Last name cannot exceed 255 characters",
    }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  username: z
    .string()
    .trim()
    .min(2, {
      message: "Username must be at least 2 characters long",
    })
    .max(255, {
      message: "Username cannot exceed 255 characters",
    }),
  about: z
    .string()
    .trim()
    .min(10, {
      message: "Please write at least 10 characters about yourself",
    })
    .max(1000, {
      message: "Bio cannot exceed 1000 characters",
    }),
  address: z
    .string()
    .trim()
    .min(5, {
      message: "Please enter a valid street address",
    })
    .max(255, {
      message: "Address cannot exceed 255 characters",
    }),
  city: z
    .string()
    .trim()
    .min(2, {
      message: "City name must be at least 2 characters long",
    })
    .max(255, {
      message: "City name cannot exceed 255 characters",
    }),
  state: z
    .string()
    .trim()
    .min(2, {
      message: "State must be at least 2 characters long",
    })
    .max(255, {
      message: "State cannot exceed 255 characters",
    }),
  zip: z
    .string()
    .trim()
    .min(5, {
      message: "Please enter a valid postal code",
    })
    .max(10, {
      message: "Postal code cannot exceed 10 characters",
    }),
  country: z
    .string()
    .trim()
    .min(2, {
      message: "Please select a valid country",
    })
    .max(255),
});

export type FormData = z.infer<typeof schema>;
