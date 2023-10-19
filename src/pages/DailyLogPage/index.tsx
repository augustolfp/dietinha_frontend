import ContentContainer from "../../components/PageContainers/ContentContainer";
import useUser from "../../hooks/authHooks/useUser";
import { useGetDailyLogStatsQuery } from "../../store/api/apiSlice";
import { useParams } from "react-router-dom";
import MealForm from "./MealForm";
import MealsList from "./MealsList";
import DailyLogCard from "./DailyLogCard";
import DailyLogHeader from "./DailyLogHeader";

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
        header = <DailyLogHeader date={data.date} />;
    }

    return (
        <ContentContainer>
            <div className="flex flex-col gap-4">
                {header}
                <DailyLogCard dailyLogId={dailyLogId!} />
                <MealForm dailyLogId={dailyLogId!} />
                <MealsList dailyLogId={dailyLogId!} />
            </div>
        </ContentContainer>
    );
}
