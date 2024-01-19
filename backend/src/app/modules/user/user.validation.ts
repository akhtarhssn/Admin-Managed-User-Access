import { z } from "zod";

const ZodSchema = z.object({
  body: z.object({
    userId: z.string(),
    password: z
      .string({
        invalid_type_error: "Password must be a valid string",
      })
      .max(30, { message: "Password cannot be more than 30 characters" })
      .optional(),
  }),
});

export const UserValidation = {
  ZodSchema,
};
