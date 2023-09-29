import useUser from "../../hooks/authHooks/useUser";
import { useGetDailyLogStatsQuery } from "../../store/api/apiSlice";
import formatDate from "../../utils/formatDate";

interface Props {
    dailyLogId: string;
    date: string;
    children?: React.ReactNode;
}

export default function DailyLog({ dailyLogId, date, children }: Props) {
    const { accessToken } = useUser();
    const { data, error, isLoading } = useGetDailyLogStatsQuery(
        { id: dailyLogId },
        {
            skip: !Boolean(accessToken),
        }
    );

    const { formattedDate, weekDay } = formatDate(date);

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (error) {
        content = <p className="text-red-600">Error on fetching</p>;
    } else if (data) {
        content = (
            <div className="stats stats-horizontal shadow">
                <div className="stat">
                    <div className="stat-title">Proteinas</div>
                    <div className="stat-value">{data.proteins} g</div>
                    <div className="stat-desc">
                        Objetivo: {data.proteinsTarget} g
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-title">Calorias</div>
                    <div className="stat-value">{data.kcals} kcal</div>
                    <div className="stat-desc">
                        Objetivo: {data.caloriesTarget} kcal
                    </div>
                </div>
                <div>Carboidratos: {data.carbs}</div>
                <div>Gorduras: {data.fats}</div>
            </div>
        );
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2>
                    {weekDay}, {formattedDate}
                </h2>
                {content}

                <div className="card-actions justify-end">{children}</div>
            </div>
        </div>
    );
}
