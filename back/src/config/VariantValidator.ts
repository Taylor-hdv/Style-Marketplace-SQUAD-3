import z from "zod";

export const createVariantSchema = z.object({
  color: z
    .string()
    .min(1, "A cor é obrigatória"),
  size: z
    .string()
    .min(1, "O tamanho é obrigatório"),
  quantity: z
    .number()
    .int("A quantidade deve ser um número inteiro")
    .nonnegative("A quantidade não pode ser negativa"),
  price: z
    .number()
    .positive("O preço deve ser maior que zero"),
  productId: z
    .string()
    .min(1, "O ID do produto é obrigatório")
});

export const updateVariantSchema = z.object({
  color: z
    .string()
    .min(1, "A cor não pode ser vazia")
    .optional(),
  size: z
    .string()
    .min(1, "O tamanho não pode ser vazio")
    .optional(),
  quantity: z
    .number()
    .int("A quantidade deve ser um número inteiro")
    .nonnegative("A quantidade não pode ser negativa")
    .optional(),
  price: z
    .number()
    .positive("O preço deve ser maior que zero")
    .optional()
});