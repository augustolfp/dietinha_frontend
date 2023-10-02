import { z } from "zod";

export const dailyLogSchema = z.object({
    date: z.date({
        required_error: "Por favor, selecione uma data",
        invalid_type_error: "Data inválida",
    }),
    notes: z.string().optional(),
    caloriesTarget: z.coerce
        .number()
        .int("Insira um número inteiro")
        .nonnegative("Insira um número positivo"),
    proteinsTarget: z.coerce
        .number()
        .int("Insira um número inteiro")
        .nonnegative("Insira um número positivo"),
});

export type DailyLogSchema = z.infer<typeof dailyLogSchema>;
