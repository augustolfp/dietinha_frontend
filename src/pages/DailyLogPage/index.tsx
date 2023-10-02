import useUser from "../../hooks/authHooks/useUser";
import { useGetDailyLogStatsQuery } from "../../store/api/apiSlice";
import { useParams } from "react-router-dom";
import MealForm from "../../components/MealForm";
import DailyLog from "../../components/DailyLog";
import formatDate from "../../utils/formatDate";
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
    let mealsList;
    if (isLoading) {
        content = <p>Loading...</p>;
        mealsList = <p>Loading...</p>;
    } else if (error) {
        content = <p className="text-red-600">Error on fetching</p>;
        mealsList = <p className="text-red-600">Error on fetching</p>;
    } else if (data) {
        const { formattedDate, weekDay } = formatDate(data.date);
        content = (
            <div>
                <div className="lg:flex lg:justify-between">
                    <h2 className="lg:text-3xl font-bold mb-6">{weekDay}</h2>
                    <p className="lg:text-3xl font-bold mb-6">
                        {formattedDate}
                    </p>
                </div>
                <DailyLog dailyLog={data} />
            </div>
        );

        mealsList = <MealsList mealsList={data.mealsList} />;
    }

    return (
        <div className="container mx-auto p-6">
            {content}
            <h2 className="text-xl font-bold">Adicionar nova refeição:</h2>
            <MealForm dailyLogId={dailyLogId!} />
            <h2 className="text-xl font-bold">Refeições:</h2>
            {mealsList}
        </div>
    );
}
