import { DailyLog } from "../../types/DailyLogTypes";

interface Props extends Omit<DailyLog, "id" | "userId"> {}

export default function Header(props: Props) {
    return (
        <div className="bg-purple-300 p-4 m-4">
            <h2 className="font-semibold text-lg">Resumo do dia:</h2>
            <ul className="m-4">
                <li>
                    <strong>Data: </strong>
                    {props.date}
                </li>
                <li>
                    <strong>Notas: </strong>
                    {props.notes ? props.notes : "Sem notas"}
                </li>
                <li>
                    <strong>Carboidratos consumidos: </strong>
                    {props.carbs} g
                </li>
                <li>
                    <strong>Gorduras consumidas: </strong>
                    {props.fats} g
                </li>
                <li>
                    <strong>Proteinas consumidas: </strong>
                    {props.proteins} de {props.proteinsTarget} g
                </li>
                <li>
                    <strong>Calorias consumidas: </strong>
                    {props.kcals} de {props.caloriesTarget} kcal
                </li>
            </ul>
        </div>
    );
}
