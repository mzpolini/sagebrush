import { z } from "zod";

export const schema = z.object({
  first: z.string().trim().min(2).max(255, {
    message: "First name must be at least 2 characters long",
  }),
  last: z.string().trim().min(2).max(255, {
    message: "Last name must be at least 2 characters long",
  }),
  email: z.string().email({ message: "Invalid email address" }),
});
