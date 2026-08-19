import {z} from "zod";

export const SignUpSchema = z.object({
    firstName: z.string().trim().min(1, {message: "Nome é obrigatório"}),
    lastName: z.string().trim().min(1, {message: "Sobrenome é obrigatório"}),
    email: z.string().trim().email({message: "Email inválido"}),
    password: z.string().trim().min(8, {message: "Senha deve ter no mínimo 8 caracteres"})
    .regex(/[A-Z]/, {message: "Senha deve conter pelo menos uma letra maiúscula"})
    .regex(/[a-z]/, {message: "Senha deve conter pelo menos uma letra minúscula"})
    .regex(/[0-9]/, {message: "Senha deve conter pelo menos um número"})
    .regex(/[^A-Za-z0-9]/, {message: "Senha deve conter pelo menos um caractere especial"}),
    confirmPassword: z.string().trim().min(8, {message: "Confirmação de senha é obrigatória"}),
    checkBox: z.boolean().refine((value) => value === true, {message: "Você deve aceitar os termos e condições"}),
})
.refine((data) => data.password === data.confirmPassword, {message: "As senhas não coincidem", path: ["confirmPassword"]});
export const SignInSchema = z.object({
    email: z.string().trim().email({message: "Email inválido"}),
    password: z.string().trim().min(1, {message: "Senha é obrigatória"})
});

export type SignInFormData = z.infer<typeof SignInSchema>;
export type SignUpFormData = z.infer<typeof SignUpSchema>;