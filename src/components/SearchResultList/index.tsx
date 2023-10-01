import { useState } from "react";
import { type TableItem } from "../../types";
import SearchResultListItem from "../SearchResultListItem";

interface Props {
    results: TableItem[];
}

export default function SearchResultList({ results }: Props) {
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

    return <div>{content}</div>;
}
