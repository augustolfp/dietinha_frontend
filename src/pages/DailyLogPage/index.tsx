import ContentContainer from "../../components/PageContainers/ContentContainer";
import useUser from "../../hooks/authHooks/useUser";
import { useGetDailyLogStatsQuery } from "../../store/api/apiSlice";
import { useParams } from "react-router-dom";
import MealForm from "../../components/MealForm";
import formatDate from "../../utils/formatDate";
import MealsList from "./MealsList";
import DailyLogStats from "../../components/DailyLogStats";

export default function DailyLogPage() {
    const { dailyLogId } = useParams();

    const { accessToken } = useUser();
    const { data, error, isLoading } = useGetDailyLogStatsQuery(
        { id: dailyLogId! },
        {
            skip: !Boolean(accessToken),
        }
    );

    let header;
    if (isLoading) {
        header = <p>Loading...</p>;
    } else if (error) {
        header = <p className="text-red-600">Error on fetching</p>;
    } else if (data) {
        const { formattedDate, weekDay } = formatDate(data.date);
        header = (
            <div>
                <div className="lg:flex lg:justify-between">
                    <h2 className="lg:text-3xl font-bold mb-6">{weekDay}</h2>
                    <p className="lg:text-3xl font-bold mb-6">
                        {formattedDate}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <ContentContainer>
            <div className="flex flex-col gap-4">
                {header}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <DailyLogStats dailyLogId={dailyLogId!} />
                    </div>
                </div>
                <MealForm dailyLogId={dailyLogId!} />
                <MealsList dailyLogId={dailyLogId!} />
            </div>
        </ContentContainer>
    );
}
