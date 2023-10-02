import RadialProgress from "../RadialProgress";
import { type DailyLog as DailyLogType } from "../../types";

interface Props {
    dailyLog: DailyLogType;
    children?: React.ReactNode;
}

export default function DailyLog({ dailyLog, children }: Props) {
    return (
        <>
            <div className="grid grid-cols-2 gap-2">
                <div className="row-span-3 bg-blue-100 p-3">
                    <RadialProgress
                        numerator={dailyLog.kcals}
                        denominator={dailyLog.caloriesTarget}
                    />
                    <div className="font-semibold">
                        Calorias: {dailyLog.kcals} kcal
                    </div>

                    <div className="font-semibold">
                        Objetivo: {dailyLog.caloriesTarget} kcal
                    </div>
                </div>
                <div className="row-span-3 bg-red-100 p-3">
                    <RadialProgress
                        numerator={dailyLog.proteins}
                        denominator={dailyLog.proteinsTarget}
                    />
                    <div className="font-semibold">
                        Proteinas: {dailyLog.proteins} g
                    </div>

                    <div className="font-semibold">
                        Objetivo: {dailyLog.proteinsTarget} g
                    </div>
                </div>

                <div className="row-span-2 bg-yellow-100 p-3">
                    <div className="flex items-center justify-center text-lg font-bold">
                        {dailyLog.fats}g
                    </div>
                    <div className="font-semibold">Gorduras</div>
                </div>
                <div className="row-span-3 bg-green-100 p-3">
                    <div className="flex items-center justify-center text-lg font-bold">
                        {dailyLog.carbs}g
                    </div>
                    <div className="font-semibold">Carboidratos</div>
                </div>
            </div>
            {children}
        </>
    );
}
