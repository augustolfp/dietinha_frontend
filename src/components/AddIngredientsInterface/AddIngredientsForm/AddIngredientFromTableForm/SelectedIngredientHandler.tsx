import { useState } from "react";
import { type TableItem } from "../../../../types";
import { useAddIngredientMutation } from "../../../../store/api/apiSlice";

interface Props {
    resultItem: TableItem;
    mealId: string;
}

export default function SelectedIngredientHandler({
    resultItem,
    mealId,
}: Props) {
    const [addIngredient, { isLoading }] = useAddIngredientMutation();
    const [ingredientWeight, setIngredientWeight] = useState(
        resultItem.baseQty
    );

    const kcals = (resultItem.kcals / resultItem.baseQty) * ingredientWeight;
    const carbs = (resultItem.carbs / resultItem.baseQty) * ingredientWeight;
    const proteins =
        (resultItem.proteins / resultItem.baseQty) * ingredientWeight;
    const fats = (resultItem.fats / resultItem.baseQty) * ingredientWeight;

    const handleAddIngredient = () => {
        const newIngredient = {
            name: resultItem.description,
            weight: ingredientWeight,
            mealId,
            kcals,
            carbs,
            proteins,
            fats,
        };

        addIngredient(newIngredient);
    };

    return (
        <div className="grid grid-cols-2 border-solid border-2 border-black p-4 gap-4">
            <div className="flex gap-x-1">
                <div className="font-light text-sm">{kcals.toFixed(1)}kcal</div>
                <div className="font-light text-sm">{carbs.toFixed(1)}C</div>
                <div className="font-light text-sm">{proteins.toFixed(1)}P</div>
                <div className="font-light text-sm">{fats.toFixed(1)}G</div>
            </div>

            <div>
                <input
                    type="number"
                    value={ingredientWeight}
                    onChange={(e) =>
                        setIngredientWeight(Number(e.target.value))
                    }
                    className="w-16"
                />
                g
            </div>
            <button
                disabled={isLoading}
                onClick={handleAddIngredient}
                className="btn btn-primary col-span-2"
            >
                Adicionar
            </button>
        </div>
    );
}
