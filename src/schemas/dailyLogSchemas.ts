import { z } from "zod";

export const dailyLogSchema = z.object({
    date: z.string().nonempty("A data é obrigatória"),
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
