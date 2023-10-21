import { type Ingredient } from "../../../../types";

interface Props {
    calculatedIngredient: Omit<Ingredient, "id">;
    changeIngredientWeight: (weight: number) => void;
    addIngredient: () => void;
    isAddingIngredient: boolean;
    isEnabled: boolean;
}

export default function SelectedIngredientHandler({
    calculatedIngredient,
    changeIngredientWeight,
    addIngredient,
    isAddingIngredient,
    isEnabled,
}: Props) {
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
                disabled={isAddingIngredient || !isEnabled}
                onClick={() => addIngredient()}
                className="btn btn-primary col-span-2"
            >
                Adicionar
            </button>
        </div>
    );
}
