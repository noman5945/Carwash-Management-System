import { z } from "zod";

const serviceValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: "Name must be a string" }),
    description: z.string(),
    price: z.number(),
    duration: z.number(),
    isDeleted: z.boolean().optional(),
    img: z.string().optional(),
  }),
});

const updateServiceValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: "Name must be a string" }).optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    duration: z.number().optional(),
    isDeleted: z.boolean().optional(),
    img: z.string().optional(),
  }),
});

export const ServiceValidators = {
  serviceValidationSchema,
  updateServiceValidationSchema,
};
