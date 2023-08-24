import type { Ingredient } from "../../../../types/DailyLogTypes";

interface Props extends Omit<Ingredient, "id" | "mealId"> {}

export default function Ingredient(props: Props) {
    return (
        <div className="bg-pink-300 p-4 m-4">
            <h5 className="font-semibold text-xs">{props.name}</h5>
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
