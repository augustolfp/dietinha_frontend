import { DailyLog as DailyLogType } from "../../types";

interface Props {
    dailyLog: Omit<DailyLogType, "mealsList">;
    children?: React.ReactNode;
}

export default function DailyLog({ dailyLog, children }: Props) {
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

                <div className="card-actions justify-end">{children}</div>
            </div>
        </div>
    );
}
