import { Link } from "react-router-dom";
import { DailyLog } from "../../types/DailyLogTypes";

interface Props {
    dailyLog: DailyLog;
}

export default function DashboardCard({ dailyLog }: Props) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{dailyLog.date}</h2>

                <div className="stats stats-horizontal shadow">
                    <div className="stat">
                        <div className="stat-title">Proteinas</div>
                        <div className="stat-value">{dailyLog.proteins} g</div>
                        <div className="stat-desc">
                            Objetivo: {dailyLog.proteinsTarget} g
                        </div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Calorias</div>
                        <div className="stat-value">{dailyLog.kcals} kcal</div>
                        <div className="stat-desc">
                            Objetivo: {dailyLog.caloriesTarget} kcal
                        </div>
                    </div>
                </div>

                <div className="card-actions justify-end">
                    <Link
                        className="btn btn-primary"
                        to={`/daily-log/${dailyLog.id}`}
                    >
                        Ver detalhes
                    </Link>
                </div>
            </div>
        </div>
    );
}
