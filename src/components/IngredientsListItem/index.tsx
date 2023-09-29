import type { Ingredient as IngredientType } from "../../types";

interface Props {
    ingredient: IngredientType;
}

export default function IngredientsListItem({ ingredient }: Props) {
    return (
        <div>
            <h4 className="text-md font-bold">{ingredient.name}</h4>
            <ul className="list-disc list-inside text-sm p-2">
                <li>
                    <strong>Quantidade: </strong>
                    {ingredient.weight} g
                </li>
                <li>
                    <strong>Carboidratos: </strong>
                    {ingredient.carbs} g
                </li>
                <li>
                    <strong>Gorduras: </strong>
                    {ingredient.fats} g
                </li>
                <li>
                    <strong>Proteinas: </strong>
                    {ingredient.proteins} g
                </li>
                <li>
                    <strong>Calorias: </strong>
                    {ingredient.kcals} kcal
                </li>
            </ul>
        </div>
    );
}
