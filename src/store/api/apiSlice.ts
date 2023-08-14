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
    tagTypes: ["CountedDay"],
    endpoints: (builder) => ({
        getCountedDays: builder.query({
            query: () => ({
                url: "/get-days-data",
                // headers: { Authorization: `Bearer ${token}` },
                method: "GET",
            }),
            providesTags: ["CountedDay"],
        }),
    }),
});

export const { useGetCountedDaysQuery } = apiSlice;
