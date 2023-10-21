import { useState } from "react";
import useUser from "./authHooks/useUser";
import { useSearchTableQuery } from "../store/api/apiSlice";
import { type TableItem } from "../types";

export default function useSearch(term: string) {
    const {accessToken} = useUser()

    const { data, isError, isFetching } = useSearchTableQuery(
        { description: term },
        { skip: !Boolean(accessToken) || term.length < 3 }
    );

    let result: TableItem[] = []
    if (isFetching || isError) {
        result = []
    } else if (data) {
        result = data.tacoResults
    }

    return {result, isError, isFetching}
}