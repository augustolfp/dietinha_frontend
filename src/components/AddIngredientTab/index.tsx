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
            <div className="tabs">
                <a
                    onClick={handleToggle}
                    className={`tab tab-bordered tab-sm w-1/2 ${
                        toggle ? "tab-active" : ""
                    }`}
                >
                    Pesquise na tabela
                </a>
                <a
                    onClick={handleToggle}
                    className={`tab tab-bordered tab-sm w-1/2 ${
                        !toggle ? "tab-active" : ""
                    }`}
                >
                    Crie um ingrediente
                </a>
            </div>
            <div className="py-3">
                {toggle ? (
                    <SearchTable mealId={mealId} />
                ) : (
                    <IngredientForm mealId={mealId} />
                )}
            </div>
        </div>
    );
}
