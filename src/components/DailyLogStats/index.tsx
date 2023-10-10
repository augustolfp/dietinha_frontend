import useUser from "../../hooks/authHooks/useUser";
import { useGetDailyLogStatsQuery } from "../../store/api/apiSlice";
import DailyLogStatsLayout from "./DailyLogStatsLayout";

interface Props {
    dailyLogId: string;
}

export default function DailyLogStats({ dailyLogId }: Props) {
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
        content = <DailyLogStatsLayout dailyLog={data} />;
    }

    return <>{content}</>;
}
