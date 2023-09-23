import { Link } from "react-router-dom";
import { DailyLog } from "../../types/DailyLogTypes";

interface Props {
    dailyLog: DailyLog;
}

export default function DashboardCard({ dailyLog }: Props) {
    return (
        <div className="bg-white shadow-md p-4">
            <h2 className="font-semibold text-lg mb-8">Daily Log</h2>
            <ul className="list-disc list-inside mb-8">
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
            <Link
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                to={`/daily-log/${dailyLog.id}`}
            >
                Ver detalhes
            </Link>
        </div>
    );
}
