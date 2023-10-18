import { type DailyLog as DailyLogType } from "../../types";
import ProgressBar from "./ProgressBar";

interface Props {
    dailyLog: Omit<DailyLogType, "mealsList">;
}

export default function DailyLogStatsLayout({ dailyLog }: Props) {
    return (
        <div className="flex sm:flex-col lg:flex-row gap-4 justify-between">
            <div className="flex flex-col sm:flex-row justify-between">
                <div className="">
                    <div className="stat-title">Calorias</div>
                    <div className="stat-value text-primary">
                        {dailyLog.kcals}kcal
                    </div>
                    <div className="stat-desc">
                        Alvo: {dailyLog.caloriesTarget}kcal
                    </div>
                </div>

                <div className="divider divider-vertical sm:divider-horizontal m-0"></div>

                <div className="">
                    <div className="stat-title">Proteínas</div>
                    <div className="stat-value text-secondary">
                        {dailyLog.proteins}g
                    </div>
                    <div className="stat-desc">
                        Alvo: {dailyLog.proteinsTarget}g
                    </div>
                </div>

                <div className="divider divider-vertical sm:divider-horizontal m-0"></div>

                <div className="flex">
                    <div className="">
                        <div className="stat-title">Gorduras</div>
                        <div className="stat-value text-accent">
                            {dailyLog.fats}g
                        </div>
                    </div>

                    <div className="divider divider-horizontal m-0"></div>

                    <div className="">
                        <div className="stat-title ">Carboidratos</div>
                        <div className="stat-value text-accent">
                            {dailyLog.carbs}g
                        </div>
                    </div>
                </div>
            </div>
            <ProgressBar
                caloriesPercentage={
                    (dailyLog.kcals / dailyLog.caloriesTarget) * 100
                }
                proteinsPercentage={
                    (dailyLog.proteins / dailyLog.proteinsTarget) * 100
                }
            />
        </div>
    );
}
