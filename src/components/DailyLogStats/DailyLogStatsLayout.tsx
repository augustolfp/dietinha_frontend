import { AiOutlineFire } from "react-icons/ai";
import { LuBeef } from "react-icons/lu";
import { type DailyLog as DailyLogType } from "../../types";

interface Props {
    dailyLog: DailyLogType;
}

export default function DailyLogStatsLayout({ dailyLog }: Props) {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-1 gap-4">
            <div className="stats stats-vertical sm:stats-horizontal col-span-2 sm:col-span-1">
                <div className="stat bg-pink-300">
                    <div className="stat-figure text-primary">
                        <AiOutlineFire />
                    </div>
                    <div className="stat-title">Calorias</div>
                    <div className="stat-value text-primary">
                        {dailyLog.kcals}kcal
                    </div>
                    <div className="stat-desc">
                        Alvo: {dailyLog.caloriesTarget}kcal
                    </div>
                </div>

                <div className="stat bg-slate-300">
                    <div className="stat-figure text-secondary">
                        <LuBeef />
                    </div>
                    <div className="stat-title">Proteínas</div>
                    <div className="stat-value text-secondary">
                        {dailyLog.proteins}g
                    </div>
                    <div className="stat-desc">
                        Alvo: {dailyLog.proteinsTarget}g
                    </div>
                </div>

                <div className="flex bg-yellow-300 w-10">
                    <div>
                        <div className="stat-title text-xs bg-pink-300">
                            Gorduras
                        </div>
                        <div className="stat-value text-3xl text-accent bg-blue-300">
                            {dailyLog.fats}g
                        </div>
                    </div>

                    <div className="divider divider-horizontal m-0 mt-6 sm:mt-0"></div>

                    <div className="bg-pink-300">
                        <div className="stat-title text-xs">Carboidratos</div>
                        <div className="stat-value text-3xl text-accent">
                            {dailyLog.carbs}g
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-primary h-{346} w-10 sm:w-full sm:h-10 rounded-md col-span-1"></div>
        </div>
    );
}
