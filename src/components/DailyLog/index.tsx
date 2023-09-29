import useUser from "../../hooks/authHooks/useUser";
import { useGetDailyLogStatsQuery } from "../../store/api/apiSlice";
import RadialProgress from "../RadialProgress";

interface Props {
    dailyLogId: string;
    children?: React.ReactNode;
}

export default function DailyLog({ dailyLogId, children }: Props) {
    const { accessToken } = useUser();
    const { data, error, isLoading } = useGetDailyLogStatsQuery(
        { id: dailyLogId },
        {
            skip: !Boolean(accessToken),
        }
    );

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (error) {
        content = <p className="text-red-600">Error on fetching</p>;
    } else if (data) {
        content = (
            <div className="grid grid-cols-2 gap-2">
                <div className="row-span-3 bg-blue-100 p-3">
                    <RadialProgress
                        numerator={data.kcals}
                        denominator={data.caloriesTarget}
                    />
                    <div className="font-semibold">
                        Calorias: {data.kcals} kcal
                    </div>

                    <div className="font-semibold">
                        Objetivo: {data.caloriesTarget} kcal
                    </div>
                </div>
                <div className="row-span-3 bg-red-100 p-3">
                    <RadialProgress
                        numerator={data.proteins}
                        denominator={data.proteinsTarget}
                    />
                    <div className="font-semibold">
                        Proteinas: {data.proteins} g
                    </div>

                    <div className="font-semibold">
                        Objetivo: {data.proteinsTarget} g
                    </div>
                </div>

                <div className="row-span-2 bg-yellow-100 p-3">
                    <div className="flex items-center justify-center text-lg font-bold">
                        {data.fats}g
                    </div>
                    <div className="font-semibold">Gorduras</div>
                </div>
                <div className="row-span-3 bg-green-100 p-3">
                    <div className="flex items-center justify-center text-lg font-bold">
                        {data.carbs}g
                    </div>
                    <div className="font-semibold">Carboidratos</div>
                </div>
            </div>
        );
    }

    return (
        <>
            {content}
            {children}
        </>
    );
}
