import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const countedDaysApi = createApi({
    reducerPath: "countedDays",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
    }),
    endpoints(builder) {
        return {
            fetchCountedDays: builder.query({
                query: (token: string) => {
                    return {
                        url: "/get-days-data",
                        headers: { Authorization: `Bearer ${token}` },
                        method: "GET",
                    };
                },
            }),
        };
    },
});

export const { useFetchCountedDaysQuery } = countedDaysApi;
export { countedDaysApi };
