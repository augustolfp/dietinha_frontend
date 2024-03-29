import { z } from "zod";

export const signInSchema = z.object({
    email: z
        .string()
        .email("Formato de email inválido")
        .nonempty("O Email é obrigatório"),
    password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres"),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
    displayName: z
        .string()
        .nonempty("O nome é obrigatório")
        .transform((name) => {
            return name
                .trim()
                .split(" ")
                .map((word) => {
                    return word[0]
                        .toLocaleUpperCase()
                        .concat(word.substring(1));
                })
                .join(" ");
        }),
    email: z
        .string()
        .email("Formato de email inválido")
        .nonempty("O Email é obrigatório"),
    password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
