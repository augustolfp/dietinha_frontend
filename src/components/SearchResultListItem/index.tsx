import { type TableItem } from "../../types";

interface Props {
    resultItem: TableItem;
    isSelected: boolean;
}

export default function SearchResultListItem({
    resultItem,
    isSelected,
}: Props) {
    return (
        <div className={`${isSelected ? "font-bold text-blue-700" : ""}`}>
            {resultItem.description}
        </div>
    );
}
