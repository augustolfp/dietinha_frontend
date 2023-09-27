import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../config/firebase";
import type {
    DailyLog,
    // AddDailyLog,
    // DetailedDailyLog,
    Meal,
    // AddMeal,
    Ingredient,
    // AddIngredient,
} from "../../types";

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
    tagTypes: ["DailyLog", "DetailedDailyLog"],
    endpoints: (builder) => ({
        getDailyLogs: builder.query<Omit<DailyLog, "mealsList">[], string>({
            query: () => ({
                url: "/daily-log",
                method: "GET",
            }),
            providesTags: ["DailyLog"],
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
            invalidatesTags: ["DailyLog"],
        }),
        getDailyLogById: builder.query<DailyLog, string>({
            query: (dailyLogId) => ({
                url: `/daily-log/${dailyLogId}`,
                method: "GET",
            }),
            providesTags: ["DetailedDailyLog"],
        }),
        addMeal: builder.mutation<
            Pick<
                Meal,
                "id" | "name" | "description" | "createdAt" | "dailyLogId"
            >,
            Pick<Meal, "name" | "description" | "dailyLogId">
        >({
            query: (newMeal) => ({
                url: "/meal",
                method: "POST",
                body: newMeal,
            }),
            invalidatesTags: ["DailyLog", "DetailedDailyLog"],
        }),
        addIngredient: builder.mutation<Ingredient, Omit<Ingredient, "id">>({
            query: (newIngredient) => ({
                url: "/ingredient",
                method: "POST",
                body: newIngredient,
            }),
            invalidatesTags: ["DailyLog", "DetailedDailyLog"],
        }),
    }),
});

export const {
    useGetDailyLogsQuery,
    useGetDailyLogByIdQuery,
    useAddDailyLogMutation,
    useAddMealMutation,
    useAddIngredientMutation,
} = apiSlice;
