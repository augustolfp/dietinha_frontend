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
};

export type AddDailyLog = Omit<
    DailyLog,
    "id" | "userId" | "carbs" | "fats" | "proteins" | "kcals"
>;
