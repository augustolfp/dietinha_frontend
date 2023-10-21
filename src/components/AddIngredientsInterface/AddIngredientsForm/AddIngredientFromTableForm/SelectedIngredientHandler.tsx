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
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
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

                <div className="join">
                    <input
                        type="number"
                        value={calculatedIngredient.weight || ""}
                        onChange={(e) =>
                            changeIngredientWeight(Number(e.target.value))
                        }
                        className="input input-bordered join-item w-20"
                    />
                    <div className="join-item bg-base-300 px-4 text-sm text-base-content flex items-center">
                        g
                    </div>
                </div>
            </div>
            <button
                disabled={isAddingIngredient || !isEnabled}
                onClick={() => addIngredient()}
                className="btn btn-neutral w-full"
            >
                Adicionar
            </button>
        </div>
    );
}
