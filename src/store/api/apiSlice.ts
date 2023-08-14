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
            providesTags: (result = [], error, arg) => [
                "CountedDay",
                ...result.map(({ id }: { id: string }) => ({
                    type: "CountedDay",
                    id,
                })),
            ],
        }),
    }),
});

export const { useGetCountedDaysQuery } = apiSlice;
