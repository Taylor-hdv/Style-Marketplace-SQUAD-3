import {z} from "zod";

export const createUserSchema = z.object({
    firstName: z.string().trim().min(1, "Nome é obrigatório"),
    lastName: z.string().trim().min(1, "Sobrenome é obrigatório"),
    email: z.string().trim().email("Email inválido"),
    password: z.string().trim().min(8, "Senha deve ter no minimo 8 caracteres")
    .regex(/[A-Z]/, {
        message: "Senha deve conter pelo menos uma letra maiúscula",
      })
      .regex(/[a-z]/, {
        message: "Senha deve conter pelo menos uma letra minúscula",
      })
      .regex(/[0-9]/, { message: "Senha deve conter pelo menos um número" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Senha deve conter pelo menos um caractere especial",
      }),
    smsNotification: z.boolean().optional(),
    marketingEmails: z.boolean().optional(),
    orderUpdates: z.boolean().optional(),
    newArrivals: z.boolean().optional(),
    emailNotification: z.boolean().optional(),
    salesAlerts: z.boolean().optional(),
})

export const updateUserSchema = z.object({
    firstName: z.string().trim().min(1, "Nome inválido").optional(),
    lastName: z.string().trim().min(1, "Sobrenome inválido").optional(),
    password: z.string().trim().min(8, "Senha deve ter no minimo 8 caracteres")
    .regex(/[A-Z]/, {
        message: "Senha deve conter pelo menos uma letra maiúscula",
      })
      .regex(/[a-z]/, {
        message: "Senha deve conter pelo menos uma letra minúscula",
      })
      .regex(/[0-9]/, { message: "Senha deve conter pelo menos um número" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Senha deve conter pelo menos um caractere especial",
      }).optional(),
    email: z.string().trim().email("Email inválido").optional(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    birthDate: z.string().optional(),
})
export const loginSchema = z.object({
    email: z.string().trim().email("Email inválido"),
    password: z.string().trim().min(8, "Senha deve ter no minimo 8 caracteres")
    .regex(/[A-Z]/, {
        message: "Senha deve conter pelo menos uma letra maiúscula",
      })
      .regex(/[a-z]/, {
        message: "Senha deve conter pelo menos uma letra minúscula",
      })
      .regex(/[0-9]/, { message: "Senha deve conter pelo menos um número" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Senha deve conter pelo menos um caractere especial",
      })
})
export type createUserSchema = z.infer<typeof createUserSchema>
export type updateUserSchema = z.infer<typeof updateUserSchema>
export type loginSchema = z.infer<typeof loginSchema>

