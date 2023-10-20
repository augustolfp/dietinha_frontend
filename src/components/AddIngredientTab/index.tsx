import { useState } from "react";
import AddCustomIngredientForm from "./AddCustomIngredientForm";
import AddIngredientFromTableForm from "./AddIngredientFromTableForm";
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
                    <AddIngredientFromTableForm mealId={mealId} />
                ) : (
                    <AddCustomIngredientForm mealId={mealId} />
                )}
            </div>
        </div>
    );
}
