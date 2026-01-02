import { z } from "zod";

export const availabilityBlockSchema = z
  .object({
    dayOfWeek: z.number().min(0).max(6),
    startTime: z.string().regex(/^\d{2}:\d{2}$/),
    endTime: z.string().regex(/^\d{2}:\d{2}$/),
    timezone: z.string().min(1)
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "Start time must be before end time",
    path: ["endTime"]
  });

export type AvailabilityBlockInput = z.infer<typeof availabilityBlockSchema>;
