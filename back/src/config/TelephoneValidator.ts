import z from "zod";

const telephone = z.object({

    DDD: z.string().regex(/^\d+$/, "DDD deve conter apenas números"),
    phoneNumber: z
    .string()
    .min(9)
    .regex(/^\d+$/, "Telefone deve conter apenas números"),
});