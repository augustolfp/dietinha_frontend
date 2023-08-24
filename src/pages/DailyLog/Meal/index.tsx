import type { DetailedMeal } from "../../../types/DailyLogTypes";

interface Props extends Omit<DetailedMeal, "id" | "createdAt" | "dailyLogId"> {}

export default function Meal(props: Props) {
    return (
        <div className="bg-purple-200 p-4">
            <h3 className="font-semibold text-lg">{props.name}</h3>
            <ul className="m-4">
                <li>
                    <strong>Descrição: </strong>
                    {props.description ? props.description : "Sem descrição"}
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
