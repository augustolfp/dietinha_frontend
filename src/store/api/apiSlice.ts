import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
    }),
    tagTypes: ["CountedDay"],
    endpoints: (builder) => ({
        getCountedDays: builder.query({
            query: (token: string) => ({
                url: "/get-days-data",
                headers: { Authorization: `Bearer ${token}` },
                method: "GET",
            }),
            providesTags: ["CountedDay"],
        }),
    }),
});

export const { useGetCountedDaysQuery } = apiSlice;
