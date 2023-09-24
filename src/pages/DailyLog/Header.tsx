import type { DailyLog } from "../../types/DailyLogTypes";

interface Props extends Omit<DailyLog, "id" | "userId"> {}

export default function Header(props: Props) {
    return (
        <div>
            <h2 className="text-xl font-bold">Resumo do dia:</h2>
            <ul>
                <li>
                    <b>Data: </b>
                    {props.date}
                </li>
                <li>
                    <b>Notas: </b>
                    {props.notes ? props.notes : "Sem notas"}
                </li>
                <li>
                    <b>Carboidratos consumidos: </b>
                    {props.carbs} g
                </li>
                <li>
                    <b>Gorduras consumidas: </b>
                    {props.fats} g
                </li>
                <li>
                    <b>Proteinas consumidas: </b>
                    {props.proteins} de {props.proteinsTarget} g
                </li>
                <li>
                    <b>Calorias consumidas: </b>
                    {props.kcals} de {props.caloriesTarget} kcal
                </li>
            </ul>
        </div>
    );
}
