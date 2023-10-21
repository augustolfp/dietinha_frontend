import { useState } from "react";
import SearchResultList from "./SearchResultList";
import SearchResultListItem from "./SearchResultListItem";
import SearchBar from "./SearchBar";
import SelectedIngredientHandler from "./SelectedIngredientHandler";
import useSearch from "../../../../hooks/useSearch";
import useAddIngredientFromTable from "../../../../hooks/useAddIngredientFromTable";

interface Props {
    mealId: string;
}

export default function AddIngredientFromTableForm({ mealId }: Props) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const {
        result,
        isError,
        isSearching,
        setSelectedIngredient,
        selectedIngredient,
    } = useSearch(searchTerm);

    const { ...props } = useAddIngredientFromTable(selectedIngredient, mealId);

    let content;
    if (isSearching) {
        content = <p>Loading...</p>;
    } else if (isError) {
        content = <p className="text-red-600">Error on fetching</p>;
    } else if (result) {
        content = result.map((resultItem) => (
            <SearchResultListItem
                key={resultItem.id}
                selectedIngId={selectedIngredient?.id ?? null}
                setSelectedIngId={setSelectedIngredient}
                resultItem={resultItem}
            />
        ));
    }

    let selectionHandler;
    if (selectedIngredient) {
        selectionHandler = <SelectedIngredientHandler {...props} />;
    } else {
        selectionHandler = <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col gap-2">
            <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchResultList>{content}</SearchResultList>
            <div>{selectedIngredient && <>{selectionHandler}</>}</div>
        </div>
    );
}
