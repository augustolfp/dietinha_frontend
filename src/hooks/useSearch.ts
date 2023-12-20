import { useState } from "react";
import useUser from "./authHooks/useUser";
import { useSearchTableQuery } from "../store/api/apiSlice";
import { type TableItem } from "../types";

export default function useSearch(term: string) {
    const [selectedIngId, setSelectedIngId] = useState<null | string>(null);

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

    const setSelectedIngredient = (id: string) => {
        setSelectedIngId(id)
    }

    let selectedIngredient: TableItem | null = null
    if(!isFetching && result && selectedIngId) {
        const findIng = result.find(ing => ing.id === selectedIngId)
        if(findIng) {
            selectedIngredient = findIng
        }
    }

    return {result, isError, isSearching: isFetching, setSelectedIngredient, selectedIngredient}
}