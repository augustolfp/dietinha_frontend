import { Link } from "react-router-dom";
import useUser from "../../hooks/authHooks/useUser";
import { useGetDailyLogStatsQuery } from "../../store/api/apiSlice";
import DailyLogStats from "../../components/DailyLogStats";

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
        content = (
            <Link to={`/daily-log/${data.id}`}>
                <div className="card bg-base-100 shadow-xl w-full">
                    <div className="card-body bg-cyan-300">
                        {data && <div className="card-title">{data.date}</div>}
                        <DailyLogStats dailyLog={data} />
                    </div>
                </div>
            </Link>
        );
    }

    return <>{content}</>;
}
