import { z } from "zod";

export const ingredientSchema = z.object({
    name: z.string().nonempty("O nome é obrigatório"),
    weight: z.coerce.number().nonnegative("Insira um número positivo"),
    carbs: z.coerce.number().nonnegative("Insira um número positivo"),
    fats: z.coerce.number().nonnegative("Insira um número positivo"),
    proteins: z.coerce.number().nonnegative("Insira um número positivo"),
    kcals: z.coerce.number().nonnegative("Insira um número positivo"),
});

export type IngredientSchema = z.infer<typeof ingredientSchema>;
