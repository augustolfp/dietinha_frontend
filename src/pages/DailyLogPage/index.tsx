import useUser from "../../hooks/authHooks/useUser";
import { useGetDailyLogStatsQuery } from "../../store/api/apiSlice";
import { useParams } from "react-router-dom";
import MealForm from "../../components/MealForm";
import DailyLog from "../../components/DailyLog";

import MealsList from "../../components/MealsList";

export default function DailyLogPage() {
    const { dailyLogId } = useParams();

    const { accessToken } = useUser();
    const { data, error, isLoading } = useGetDailyLogStatsQuery(
        { id: dailyLogId! },
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
            <div>
                <div className="lg:flex lg:justify-between">
                    <h2 className="lg:text-3xl font-bold mb-6">{data.date}</h2>
                    <p className="lg:text-3xl font-bold mb-6">Data</p>
                </div>
                <DailyLog dailyLog={data} />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            {content}
            <h2 className="text-xl font-bold">Adicionar nova refeição:</h2>
            <MealForm dailyLogId={dailyLogId!} />
            <h2 className="text-xl font-bold">Refeições:</h2>
            <MealsList dailyLogId={dailyLogId!} />
        </div>
    );
}
