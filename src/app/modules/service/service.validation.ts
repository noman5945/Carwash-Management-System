import { z } from "zod";

const serviceValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: "Name must be a string" }),
    description: z.string(),
    price: z.number(),
    duration: z.number(),
    isDeleted: z.boolean().optional(),
  }),
});

export const ServiceValidators = {
  serviceValidationSchema,
};
