import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../config/firebase";
import type {
    DailyLog,
    Meal,
    Ingredient,
    TableItem,
    SearchResult,
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
    tagTypes: [
        "UserDailyLogs",
        "DailyLog",
        "DailyLogMeals",
        "Meal",
        "SearchResult",
    ],
    endpoints: (builder) => ({
        getDailyLogs: builder.query<Pick<DailyLog, "id" | "date">[], void>({
            query: () => ({
                url: "/daily-log",
                method: "GET",
            }),
            providesTags: ["UserDailyLogs"],
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

        getDailyLogStats: builder.query<DailyLog, Pick<DailyLog, "id">>({
            query: (dailyLog) => ({
                url: `/daily-log/${dailyLog.id}`,
                method: "GET",
            }),
            providesTags: (result, _error, dailyLog) => {
                if (result?.mealsList) {
                    const mealsTags = result.mealsList.map((meal) => {
                        return { type: "Meal" as const, id: meal.id };
                    });

                    return [
                        ...mealsTags,
                        { type: "DailyLog", id: dailyLog.id },
                        { type: "DailyLogMeals", id: dailyLog.id },
                    ];
                }

                return [{ type: "DailyLog", id: dailyLog.id }];
            },
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
                return [{ type: "DailyLogMeals", id: dailyLog.id }];
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
                return [{ type: "DailyLogMeals", id: meal.dailyLogId }];
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

        getIngredients: builder.query<Ingredient[], Pick<Meal, "id">>({
            query: (meal) => ({
                url: `/ingredients/${meal.id}`,
                method: "GET",
            }),
            providesTags: (_result, _error, meal) => {
                return [{ type: "Meal", id: meal.id }];
            },
        }),

        addIngredient: builder.mutation<Ingredient, Omit<Ingredient, "id">>({
            query: (ingredient) => ({
                url: "/ingredients",
                method: "POST",
                body: ingredient,
            }),
            invalidatesTags: (_result, _error, ingredient) => {
                return [{ type: "Meal", id: ingredient.mealId }];
            },
        }),
        searchTable: builder.query<
            SearchResult,
            Pick<TableItem, "description">
        >({
            query: (arg) => ({
                url: `/datatable/search/${arg.description}`,
                method: "GET",
            }),
            providesTags: (_result, _error, arg) => {
                return [{ type: "SearchResult", id: arg.description }];
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
    useSearchTableQuery,
    useLazySearchTableQuery,
} = apiSlice;
