import { useState } from "react";
import useUser from "../../../../hooks/authHooks/useUser";
import { useSearchTableQuery } from "../../../../store/api/apiSlice";
import SearchResultList from "./SearchResultList";
import SearchBar from "./SearchBar";

interface Props {
    mealId: string;
}

export default function AddIngredientFromTableForm({ mealId }: Props) {
    const [searchTerm, setSearchTerm] = useState("");
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
        content = (
            <SearchResultList results={data.tacoResults} mealId={mealId} />
        );
    }

    return (
        <div className="flex flex-col gap-2">
            <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm.length >= 3 && <div>{content}</div>}
        </div>
    );
}
