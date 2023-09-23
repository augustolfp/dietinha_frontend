import type { DailyLog } from "../../types/DailyLogTypes";

interface Props extends Omit<DailyLog, "id" | "userId"> {}

export default function Header(props: Props) {
    return (
        <div className="bg-white shadow-md p-4 mb-4">
            <h2 className="font-semibold text-lg">Resumo do dia:</h2>
            <ul className="m-4 list-disc list-inside">
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
