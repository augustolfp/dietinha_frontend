import { z } from "zod";

export const mealSchema = z.object({
    name: z.string().nonempty("O nome é obrigatório"),
    description: z.string().optional(),
});

export type MealSchema = z.infer<typeof mealSchema>;
