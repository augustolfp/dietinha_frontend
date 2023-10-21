import { type TableItem } from "../../../../types";

interface Props {
    resultItem: TableItem;
    selectedIngId: null | string;
    setSelectedIngId: (id: string) => void;
}

export default function SearchResultListItem({
    resultItem,
    selectedIngId,
    setSelectedIngId,
}: Props) {
    return (
        <>
            <div
                onClick={() => setSelectedIngId(resultItem.id)}
                className={`${
                    resultItem.id === selectedIngId
                        ? "font-bold text-blue-700"
                        : ""
                }`}
            >
                {resultItem.description}
            </div>
        </>
    );
}
