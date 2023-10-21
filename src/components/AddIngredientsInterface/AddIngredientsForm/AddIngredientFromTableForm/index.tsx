import { useState } from "react";
import useUser from "../../../../hooks/authHooks/useUser";
import { useSearchTableQuery } from "../../../../store/api/apiSlice";
import SearchResultList from "./SearchResultList";
import SearchResultListItem from "./SearchResultListItem";
import SearchBar from "./SearchBar";
import SelectedIngredientHandler from "./SelectedIngredientHandler";

interface Props {
    mealId: string;
}

export default function AddIngredientFromTableForm({ mealId }: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIngId, setSelectedIngId] = useState<null | string>(null);
    const { accessToken } = useUser();
    const { data, error, isLoading } = useSearchTableQuery(
        { description: searchTerm },
        { skip: !Boolean(accessToken) || searchTerm.length < 3 }
    );

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (error) {
        content = <p className="text-red-600">Error on fetching</p>;
    } else if (data) {
        content = data.tacoResults.map((resultItem) => (
            <SearchResultListItem
                key={resultItem.id}
                selectedIngId={selectedIngId}
                setSelectedIngId={setSelectedIngId}
                resultItem={resultItem}
            />
        ));
    }

    let selectionHandler;
    if (!isLoading && data && selectedIngId) {
        const selectedIng = data.tacoResults.find(
            (ing) => ing.id === selectedIngId
        );

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
