import { useState } from "react";
import { type TableItem } from "../../../../types";
import SearchResultListItem from "./SearchResultListItem";
import AddIngredientFromTable from "./AddIngredientFromTable";

interface Props {
    results: TableItem[];
    mealId: string;
}

export default function SearchResultList({ results, mealId }: Props) {
    const [selectedResultId, setSelectedResultId] = useState("");

    const content = results.map((resultItem) => {
        return (
            <div
                onClick={() => setSelectedResultId(resultItem.id)}
                key={resultItem.id}
            >
                <SearchResultListItem
                    resultItem={resultItem}
                    isSelected={selectedResultId === resultItem.id}
                />
            </div>
        );
    });

    const addResultForm = () => {
        const selectedResult = results.find(
            (result) => result.id === selectedResultId
        );

        if (selectedResult) {
            return (
                <AddIngredientFromTable
                    resultItem={selectedResult}
                    mealId={mealId}
                />
            );
        }
    };
    const resultForm = addResultForm();

    return (
        <div className="bg-base-100 p-4 rounded-xl">
            {selectedResultId && <>{resultForm}</>}
            {content}
        </div>
    );
}
