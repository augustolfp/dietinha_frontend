import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../config/firebase";
import type {
    DailyLog,
    AddDailyLog,
    DetailedDailyLog,
    Meal,
    AddMeal,
} from "../../types/DailyLogTypes";

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
        getDailyLogs: builder.query<DailyLog[], string>({
            query: () => ({
                url: "/daily-log",
                method: "GET",
            }),
            providesTags: ["DailyLog"],
        }),
        addDailyLog: builder.mutation<Partial<DailyLog>, AddDailyLog>({
            query: (newDailyLog) => ({
                url: "/daily-log",
                method: "POST",
                body: newDailyLog,
            }),
            invalidatesTags: ["DailyLog"],
        }),
        getDailyLogById: builder.query<DetailedDailyLog, string>({
            query: (dailyLogId) => ({
                url: `/daily-log/${dailyLogId}`,
                method: "GET",
            }),
            providesTags: ["DetailedDailyLog"],
        }),
        addMeal: builder.mutation<Partial<Meal>, AddMeal>({
            query: (newMeal) => ({
                url: "/meal",
                method: "POST",
                body: newMeal,
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
} = apiSlice;
