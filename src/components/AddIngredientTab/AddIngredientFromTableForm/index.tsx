import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import useUser from "../../../hooks/authHooks/useUser";
import { useSearchTableQuery } from "../../../store/api/apiSlice";
import SearchResultList from "./SearchResultList";

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
            <div className="join w-full">
                <DebounceInput
                    type="text"
                    minLength={3}
                    debounceTimeout={300}
                    value={searchTerm}
                    placeholder="Pesquise aqui"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered join-item w-full"
                />
                <div className="join-item bg-base-300 text-base-content flex items-center px-4">
                    <AiOutlineSearch size={18} />
                </div>
            </div>
            {searchTerm.length >= 3 && <div>{content}</div>}
        </div>
    );
}
