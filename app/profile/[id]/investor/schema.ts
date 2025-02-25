import { z } from "zod";

export const schema = z.object({
  investmentRange: z.string().min(1, "Investment range is required"),
  investmentStyle: z.string().min(1, "Investment style is required"),
  preferredLocations: z.array(z.string()).min(1, "Add at least one location"),
  accreditedStatus: z.boolean(),
});

export type FormData = z.infer<typeof schema>;
