import { Link } from "react-router-dom";
import { DailyLog } from "../../types/DailyLogTypes";

interface Props {
    dailyLog: DailyLog;
}

export default function DashboardCard({ dailyLog }: Props) {
    return (
        <div className="bg-purple-200 p-4 flex flex-col justify-center gap-4">
            <div className="bg-purple-100 p-2">
                <h4>Data:</h4>
                <span>{dailyLog.date}</span>
            </div>

            <div className="bg-purple-100 p-2">
                <h4>Alvo de proteinas:</h4>
                <span>{dailyLog.proteinsTarget} g</span>
            </div>

            <div className="bg-purple-100 p-2">
                <h4>Proteinas consumidas:</h4>
                <span>{dailyLog.proteins}</span>
            </div>

            <div className="bg-purple-100 p-2">
                <h4>Alvo de calorias:</h4>
                <span>{dailyLog.caloriesTarget} kCal</span>
            </div>

            <div className="bg-purple-100 p-2">
                <h4>Calorias consumidas:</h4>
                <span>{dailyLog.kcals}</span>
            </div>
            <Link to={`/daily-log/${dailyLog.id}`}>Ver detalhes</Link>
        </div>
    );
}
