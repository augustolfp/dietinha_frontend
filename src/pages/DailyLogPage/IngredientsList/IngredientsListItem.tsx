import type { Ingredient as IngredientType } from "../../../types";

interface Props {
    ingredient: IngredientType;
}

export default function IngredientsListItem({ ingredient }: Props) {
    return (
        <>
            <div>
                <h4 className="text-md font-bold">{ingredient.name}</h4>
                <div className="flex gap-x-1">
                    <div className="font-light text-sm">
                        {ingredient.kcals}kcal
                    </div>
                    <div className="font-light text-sm">
                        {ingredient.carbs}C
                    </div>
                    <div className="font-light text-sm">
                        {ingredient.proteins}P
                    </div>
                    <div className="font-light text-sm">{ingredient.fats}G</div>
                </div>
            </div>
            <div className="badge badge-lg badge-info p-4">
                {ingredient.weight}g
            </div>
        </>
    );
}
