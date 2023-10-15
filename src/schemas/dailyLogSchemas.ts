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
        .nonnegative("Insira um número positivo")
        .lte(6000),
    proteinsTarget: z.coerce
        .number()
        .int("Insira um número inteiro")
        .nonnegative("Insira um número positivo")
        .lte(400),
});

export type DailyLogSchema = z.infer<typeof dailyLogSchema>;

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    
    if (issue.code === z.ZodIssueCode.too_big) {
        if (issue.type === "number") {
            return {message: `É esperado um número até ${issue.maximum} :o`}
        }
    }

    if (issue.code === z.ZodIssueCode.invalid_date) {
        return {message: "A data inserida não é válida :("}
    }

    return { message: ctx.defaultError };
}

z.setErrorMap(customErrorMap);