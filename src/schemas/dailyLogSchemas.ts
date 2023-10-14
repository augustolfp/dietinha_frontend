import { z } from "zod";
import {format, parse} from "date-fns"

export const dailyLogSchema = z.object({
    date: z.preprocess((dateStr) => {
        return parse(String(dateStr), "dd/MM/yyyy", new Date())
    }, z.date().transform((date) => format(date, "yyyy-MM-dd"))),
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
