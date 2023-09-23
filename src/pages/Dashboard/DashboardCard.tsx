import { Link } from "react-router-dom";
import { DailyLog } from "../../types/DailyLogTypes";

interface Props {
    dailyLog: DailyLog;
}

export default function DashboardCard({ dailyLog }: Props) {
    return (
        <div>
            <h2>Daily Log</h2>
            <ul>
                <li>
                    <b>Data:</b> {dailyLog.date}
                </li>
                <li>
                    <b>Alvo de proteinas:</b> {dailyLog.proteinsTarget} g
                </li>
                <li>
                    <b>Proteinas consumidas:</b> {dailyLog.proteins} g
                </li>
                <li>
                    <b>Alvo de calorias:</b> {dailyLog.caloriesTarget} kcal
                </li>
                <li>
                    <b>Calorias consumidas:</b> {dailyLog.kcals} kcal
                </li>
            </ul>
            <Link to={`/daily-log/${dailyLog.id}`}>Ver detalhes</Link>
        </div>
    );
}
