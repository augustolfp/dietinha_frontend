import useUser from "../../hooks/authHooks/useUser";
import { useGetDailyLogStatsQuery } from "../../store/api/apiSlice";
import DailyLog from "../../components/DailyLog";

interface Props {
    dailyLogId: string;
}

export default function DailyLogCard({ dailyLogId }: Props) {
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
        content = <DailyLog dailyLog={data} />;
    }

    return <>{content}</>;
}
