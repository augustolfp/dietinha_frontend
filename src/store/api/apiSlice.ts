import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../config/firebase";

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
    tagTypes: ["DailyLog"],
    endpoints: (builder) => ({
        getDailyLogs: builder.query({
            query: () => ({
                url: "/daily-log",
                method: "GET",
            }),
            providesTags: ["DailyLog"],
        }),
        addDailyLog: builder.mutation({
            query: (newDailyLog) => ({
                url: "/daily-log",
                method: "POST",
                body: newDailyLog,
            }),
            invalidatesTags: ["DailyLog"],
        }),
    }),
});

export const { useGetDailyLogsQuery, useAddDailyLogMutation } = apiSlice;
