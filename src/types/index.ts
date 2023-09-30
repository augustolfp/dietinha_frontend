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
};

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

export type TableItem = {
    id: string;
    description: string;
    baseQty: number;
    carbs: number;
    fats: number;
    proteins: number;
    kcals: number;
};

export type SearchResult = {
    tacoResults: TableItem[];
    customResults: TableItem[];
};
