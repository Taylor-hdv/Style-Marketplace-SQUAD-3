import { z } from "zod";

export const createReviewSchema = z.object({
    rating: z.number().int().min(1, "Rating mínimo é 1").max(5, "Rating máximo é 5"),

    text: z.string().min(1, "Texto é obrigatório"),

    userId: z.string().min(1, "userId é obrigatório"),

    productId: z.string().min(1, "productId é obrigatório")
});

export const updateReviewSchema = z.object({
    rating: z
        .number()
        .int()
        .min(1, "Rating mínimo é 1")
        .max(5, "Rating máximo é 5")
        .optional(),

    text: z
        .string()
        .min(1, "Texto é obrigatório")
        .optional()
});