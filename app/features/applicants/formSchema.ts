import { z } from "zod";

export const schema = z.object({
  firstName: z.string().trim().min(1).max(255, {
    message: "First name must be at least 2 characters long",
  }),
  lastName: z.string().trim().min(1).max(255, {
    message: "Last name must be at least 2 characters long",
  }),
});
