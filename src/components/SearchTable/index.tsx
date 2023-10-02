import { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import useUser from "../../hooks/authHooks/useUser";
import { useSearchTableQuery } from "../../store/api/apiSlice";
import SearchResultList from "../SearchResultList";

interface Props {
    mealId: string;
}

export default function SearchTable({ mealId }: Props) {
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
        <div>
            <DebounceInput
                type="text"
                minLength={3}
                debounceTimeout={300}
                value={searchTerm}
                placeholder="Pesquise aqui"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm.length >= 3 && (
                <div>
                    <b>Resultados:</b>
                    {content}
                </div>
            )}
        </div>
    );
}