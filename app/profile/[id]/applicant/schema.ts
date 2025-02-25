import { z } from "zod";

export const schema = z.object({
  experience: z.string().min(50, "Please provide detailed experience"),
  skills: z.array(z.string()).min(1, "Add at least one skill"),
  desiredLocation: z.string().min(2, "Location required"),
  availability: z.string().min(2, "Availability required"),
  licensingStatus: z.string().min(2, "Licensing status required"),
});

export type FormData = z.infer<typeof schema>;
