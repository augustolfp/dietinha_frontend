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
    tagTypes: [
        "DailyLog",
        "UserDailyLogs",
        "DetailedDailyLog",
        "Meal",
        "DailyLogsMeals",
    ],
    endpoints: (builder) => ({
        getDailyLogs: builder.query<Pick<DailyLog, "id" | "date">[], string>({
            query: () => ({
                url: "/daily-log",
                method: "GET",
            }),
            providesTags: ["UserDailyLogs"],
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
                return [{ type: "DailyLog", id: dailyLog.id }];
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
            invalidatesTags: ["UserDailyLogs"],
        }),
        getMeals: builder.query<
            Pick<
                Meal,
                "id" | "name" | "description" | "createdAt" | "dailyLogId"
            >[],
            Partial<DailyLog>
        >({
            query: (dailyLog) => ({
                url: `/meals/${dailyLog.id}`,
                method: "GET",
            }),
            providesTags: ["DailyLogsMeals"],
        }),
        getMealSummary: builder.query<
            Pick<Meal, "id" | "carbs" | "fats" | "proteins" | "kcals">,
            Pick<DailyLog, "id">
        >({
            query: (dailyLog) => ({
                url: `/meals/${dailyLog.id}/summary`,
                method: "GET",
            }),
        }),
        addMeal: builder.mutation<
            Pick<
                Meal,
                "id" | "name" | "description" | "createdAt" | "dailyLogId"
            >,
            Pick<Meal, "name" | "description" | "dailyLogId">
        >({
            query: (newMeal) => ({
                url: "/meals",
                method: "POST",
                body: newMeal,
            }),
            invalidatesTags: ["DailyLogsMeals"],
        }),
        addIngredient: builder.mutation<Ingredient, Omit<Ingredient, "id">>({
            query: (newIngredient) => ({
                url: "/ingredients",
                method: "POST",
                body: newIngredient,
            }),
            invalidatesTags: ["DailyLog", "DetailedDailyLog"],
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
    useAddIngredientMutation,
} = apiSlice;
