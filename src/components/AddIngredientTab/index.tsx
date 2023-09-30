import { useState } from "react";
import SearchTable from "../SearchTable";
import IngredientForm from "../IngredientForm";
interface Props {
    mealId: string;
}

export default function AddIngredientTab({ mealId }: Props) {
    const [toggle, setToggle] = useState(true);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    return (
        <div>
            <div className="tabs tabs-boxed">
                <a
                    onClick={handleToggle}
                    className={`tab ${toggle ? "tab-active" : ""}`}
                >
                    Pesquise na tabela
                </a>
                <a
                    onClick={handleToggle}
                    className={`tab ${!toggle ? "tab-active" : ""}`}
                >
                    Crie um ingrediente
                </a>
            </div>
            <div className="bg-white p-4">
                {toggle ? (
                    <div className="">
                        <SearchTable />
                    </div>
                ) : (
                    <IngredientForm mealId={mealId} />
                )}
            </div>
        </div>
    );
}
