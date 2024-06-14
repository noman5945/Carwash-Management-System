import { z } from "zod";

const datePattern = /^\d{4}-\d{2}-\d{2}$/; // yyyy-mm-dd
const timePattern = /^\d{2}:\d{2}$/; // HH:MM
const slotValidationSchema = z.object({
  body: z.object({
    service: z.string({ invalid_type_error: "Service ID must be a string" }),
    date: z
      .string()
      .regex(datePattern, { message: "Date must be in the format yyyy-mm-dd" }),
    startTime: z.string().regex(timePattern, {
      message: "Start time must be in the format HH:MM",
    }),
    endTime: z
      .string()
      .regex(timePattern, { message: "End time must be in the format HH:MM" }),
    isBooked: z.enum(["available", "booked", "canceled"]).default("available"),
  }),
});

export const SlotValidators = {
  slotValidationSchema,
};
