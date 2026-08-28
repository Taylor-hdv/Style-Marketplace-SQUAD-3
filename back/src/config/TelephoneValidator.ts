import z from "zod";

export const telephoneSchema = z.object({

    DDD: z.string().regex(/^\d+$/, "DDD deve conter apenas números"),
    phoneNumber: z
    .string()
    .min(9)
    .regex(/^\d+$/, "Telefone deve conter apenas números"),
});

