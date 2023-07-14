import { z } from "zod";

export const loginFormSchema = z.object({
    email: z
        .string()
        .email("Formato de email inválido")
        .nonempty("O Email é obrigatório"),
    password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres"),
});
