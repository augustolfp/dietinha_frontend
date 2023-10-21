import { type TableItem } from "../../../../types";
import useAddIngredientFromTable from "../../../../hooks/useAddIngredientFromTable";

interface Props {
    resultItem: TableItem;
    mealId: string;
}

export default function SelectedIngredientHandler({
    resultItem,
    mealId,
}: Props) {
    const {
        calculatedIngredient,
        changeIngredientWeight,
        addIngredient,
        isAddingIngredient,
    } = useAddIngredientFromTable(resultItem, mealId);

    const handleAddIngredient = () => {
        addIngredient();
    };

    return (
        <div className="grid grid-cols-2 border-solid border-2 border-black p-4 gap-4">
            <div className="flex gap-x-1">
                <div className="font-light text-sm">
                    {calculatedIngredient.kcals.toFixed(1)}kcal
                </div>
                <div className="font-light text-sm">
                    {calculatedIngredient.carbs.toFixed(1)}C
                </div>
                <div className="font-light text-sm">
                    {calculatedIngredient.proteins.toFixed(1)}P
                </div>
                <div className="font-light text-sm">
                    {calculatedIngredient.fats.toFixed(1)}G
                </div>
            </div>

            <div>
                <input
                    type="number"
                    value={calculatedIngredient.weight}
                    onChange={(e) =>
                        changeIngredientWeight(Number(e.target.value))
                    }
                    className="w-16"
                />
                g
            </div>
            <button
                disabled={isAddingIngredient}
                onClick={handleAddIngredient}
                className="btn btn-primary col-span-2"
            >
                Adicionar
            </button>
        </div>
    );
}
