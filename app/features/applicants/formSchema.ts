import { z } from "zod";

export const schema = z.object({
  firstName: z.string().trim().min(1).max(255, {
    message: "First name must be at least 2 characters long",
  }),
  lastName: z.string().trim().min(1).max(255, {
    message: "Last name must be at least 2 characters long",
  }),
  email: z.string().email(),
  address: z.string().trim().min(1).max(255),
  city: z.string().trim().min(1).max(255),
  state: z.string().trim().min(1).max(255),
  zip: z.string().trim().min(1).max(255),
  country: z.string().trim().min(1).max(255),
  username: z.string().trim().min(1).max(255),
  about: z.string().trim().min(1).max(255),
});
