import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),

    discount: z.number().min(0, "Desconto não pode ser negativo"),

    description: z.string().min(1, "Descrição é obrigatória"),

    tag: z.string().min(1, "Tag é obrigatória"),

    specification: z.string().min(1, "Especificação é obrigatória")
});

export const updateProductSchema = createProductSchema.partial();