import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: "Name type must be string" }),
    email: z
      .string({ invalid_type_error: "Invalid input Type. Must be a string" })
      .email(),
    password: z
      .string()
      .max(20, "Password shouldnt be more than 20 chars")
      .min(4, "Minimum 4 characters long"),
    phone: z.string().max(11, "Invalid phone number length"),
    role: z.enum(["admin", "user"]),
    address: z.string(),
  }),
});

export const userValidations = {
  userValidationSchema,
};
