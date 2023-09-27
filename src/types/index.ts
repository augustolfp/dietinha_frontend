export type DailyLog = {
    id: string;
    date: string;
    notes?: string;
    userId: string;
    caloriesTarget: number;
    proteinsTarget: number;
    carbs: number;
    fats: number;
    proteins: number;
    kcals: number;
    mealsList: Meal[];
};

// export type AddDailyLog = Omit<
//     DailyLog,
//     "id" | "userId" | "carbs" | "fats" | "proteins" | "kcals"
// >;

export type Meal = {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    dailyLogId: string;
    carbs: number;
    fats: number;
    proteins: number;
    kcals: number;
    ingredientsList: Ingredient[];
};

// export type AddMeal = Pick<Meal, "name" | "description" | "dailyLogId">;

export type Ingredient = {
    id: string;
    name: string;
    mealId: string;
    weight: number;
    carbs: number;
    fats: number;
    proteins: number;
    kcals: number;
};

// export type AddIngredient = Omit<Ingredient, "id">;

// export type DetailedDailyLog = DailyLog & {
//     mealsList: DetailedMeal[];
// };
