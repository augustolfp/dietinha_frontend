import { z } from "zod";

export const mealFormSchema = z.object({
    name: z.string().nonempty("O nome é obrigatório"),
    description: z.string().optional(),
});
