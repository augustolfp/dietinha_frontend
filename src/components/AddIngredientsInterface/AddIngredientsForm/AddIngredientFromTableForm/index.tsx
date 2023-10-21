import { useState } from "react";
import SearchResultList from "./SearchResultList";
import SearchResultListItem from "./SearchResultListItem";
import SearchBar from "./SearchBar";
import SelectedIngredientHandler from "./SelectedIngredientHandler";
import useSearch from "../../../../hooks/useSearch";

interface Props {
    mealId: string;
}

export default function AddIngredientFromTableForm({ mealId }: Props) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedIngId, setSelectedIngId] = useState<null | string>(null);
    const { result, isError, isFetching } = useSearch(searchTerm);

    let content;
    if (isFetching) {
        content = <p>Loading...</p>;
    } else if (isError) {
        content = <p className="text-red-600">Error on fetching</p>;
    } else if (result) {
        content = result.map((resultItem) => (
            <SearchResultListItem
                key={resultItem.id}
                selectedIngId={selectedIngId}
                setSelectedIngId={setSelectedIngId}
                resultItem={resultItem}
            />
        ));
    }

    let selectionHandler;
    if (!isFetching && result && selectedIngId) {
        const selectedIng = result.find((ing) => ing.id === selectedIngId);

        if (selectedIng) {
            selectionHandler = (
                <SelectedIngredientHandler
                    resultItem={selectedIng}
                    mealId={mealId}
                />
            );
        }
    } else {
        selectionHandler = <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col gap-2">
            <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchResultList>
                {searchTerm.length >= 3 && !selectedIngId && (
                    <div>{content}</div>
                )}
            </SearchResultList>
            <div>{selectedIngId && <>{selectionHandler}</>}</div>
        </div>
    );
}
