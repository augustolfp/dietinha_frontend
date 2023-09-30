import { useState } from "react";
import useUser from "../../hooks/authHooks/useUser";
import { useSearchTableQuery } from "../../store/api/apiSlice";

export default function SearchTable() {
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
        console.log(data);
        content = data.tacoResults.map((tableItem) => {
            return <p key={tableItem.id}>{tableItem.description}</p>;
        });
    }

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
                <b>Resultados:</b>
                {content}
            </div>
        </div>
    );
}
