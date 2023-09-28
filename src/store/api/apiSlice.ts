import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../config/firebase";
import type { DailyLog, Meal, Ingredient } from "../../types";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: async (headers, query) => {
            const accessToken = await auth.currentUser?.getIdToken();
            if (accessToken) {
                headers.set("authorization", "Bearer " + accessToken);
            }
            return headers;
        },
    }),
    tagTypes: ["DailyLogs", "DailyLogStats", "Meal", "MealIngredients"],
    endpoints: (builder) => ({
        getDailyLogs: builder.query<Pick<DailyLog, "id" | "date">[], string>({
            query: () => ({
                url: "/daily-log",
                method: "GET",
            }),
            providesTags: ["DailyLogs"],
        }),
        getDailyLogStats: builder.query<
            Pick<
                DailyLog,
                | "id"
                | "carbs"
                | "fats"
                | "proteins"
                | "kcals"
                | "notes"
                | "userId"
                | "caloriesTarget"
                | "proteinsTarget"
            >,
            Partial<DailyLog>
        >({
            query: (dailyLog) => ({
                url: `/daily-log/${dailyLog.id}`,
                method: "GET",
            }),
            providesTags: (_result, _error, dailyLog) => {
                return [{ type: "DailyLogStats", id: dailyLog.id }];
            },
        }),
        addDailyLog: builder.mutation<
            Pick<
                DailyLog,
                | "id"
                | "date"
                | "notes"
                | "userId"
                | "caloriesTarget"
                | "proteinsTarget"
            >,
            Pick<
                DailyLog,
                "date" | "notes" | "caloriesTarget" | "proteinsTarget"
            >
        >({
            query: (newDailyLog) => ({
                url: "/daily-log",
                method: "POST",
                body: newDailyLog,
            }),
            invalidatesTags: ["DailyLogs"],
        }),
        getMeals: builder.query<
            Pick<
                Meal,
                "id" | "name" | "description" | "createdAt" | "dailyLogId"
            >[],
            Pick<DailyLog, "id">
        >({
            query: (dailyLog) => ({
                url: `/meals/${dailyLog.id}`,
                method: "GET",
            }),
            providesTags: (_result, _error, dailyLog) => {
                return [{ type: "Meal", id: dailyLog.id }];
            },
        }),
        getMealSummary: builder.query<
            Pick<Meal, "id" | "carbs" | "fats" | "proteins" | "kcals">,
            Pick<Meal, "id">
        >({
            query: (meal) => ({
                url: `/meals/${meal.id}/summary`,
                method: "GET",
            }),
            providesTags: (_result, _error, meal) => {
                return [{ type: "Meal", id: meal.id }];
            },
        }),
        addMeal: builder.mutation<
            Pick<
                Meal,
                "id" | "name" | "description" | "createdAt" | "dailyLogId"
            >,
            Pick<Meal, "name" | "description" | "dailyLogId">
        >({
            query: (meal) => ({
                url: "/meals",
                method: "POST",
                body: meal,
            }),
            invalidatesTags: (_result, _error, meal) => {
                return [{ type: "Meal", id: meal.dailyLogId }];
            },
        }),
        getIngredients: builder.query<Ingredient[], Pick<Meal, "id">>({
            query: (meal) => ({
                url: `/ingredients/${meal.id}`,
                method: "GET",
            }),
            providesTags: (_result, _error, meal) => {
                return [{ type: "MealIngredients", id: meal.id }];
            },
        }),
        addIngredient: builder.mutation<Ingredient, Omit<Ingredient, "id">>({
            query: (ingredient) => ({
                url: "/ingredients",
                method: "POST",
                body: ingredient,
            }),
            invalidatesTags: (_result, _error, ingredient) => {
                return [
                    { type: "MealIngredients", id: ingredient.mealId },
                    { type: "Meal", id: ingredient.mealId },
                ];
            },
        }),
    }),
});

export const {
    useGetDailyLogsQuery,
    useGetDailyLogStatsQuery,
    useAddDailyLogMutation,
    useAddMealMutation,
    useGetMealsQuery,
    useGetMealSummaryQuery,
    useGetIngredientsQuery,
    useAddIngredientMutation,
} = apiSlice;
