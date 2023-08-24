import type { Ingredient } from "../../../../types/DailyLogTypes";

interface Props extends Omit<Ingredient, "id" | "mealId"> {}

export default function Ingredient(props: Props) {
    return (
        <div>
            <h3 className="font-semibold text-lg">{props.name}</h3>
            <ul className="m-4">
                <li>
                    <strong>Quantidade: </strong>
                    {props.weight} g
                </li>
                <li>
                    <strong>Carboidratos: </strong>
                    {props.carbs} g
                </li>
                <li>
                    <strong>Gorduras: </strong>
                    {props.fats} g
                </li>
                <li>
                    <strong>Proteinas: </strong>
                    {props.proteins} g
                </li>
                <li>
                    <strong>Calorias: </strong>
                    {props.kcals} kcal
                </li>
            </ul>
        </div>
    );
}
