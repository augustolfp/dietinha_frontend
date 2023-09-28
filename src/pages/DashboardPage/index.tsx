import useUser from "../../hooks/authHooks/useUser";
import { Link } from "react-router-dom";
import { useGetDailyLogsQuery } from "../../store/api/apiSlice";
import DailyLogForm from "../../components/DailyLogForm";
import DailyLog from "../../components/DailyLog";

export default function DashboardPage() {
    const { accessToken } = useUser();
    const { data, isFetching, isSuccess } = useGetDailyLogsQuery(
        "required_arg",
        {
            skip: !Boolean(accessToken),
        }
    );

    let content;
    if (isFetching) {
        content = <div>Loading....</div>;
    } else if (isSuccess) {
        content = (
            <>
                {data.map((dailyLog) => (
                    <div key={dailyLog.id}>
                        <h2>{dailyLog.date}</h2>
                        <DailyLog dailyLogId={dailyLog.id}>
                            <Link
                                className="btn btn-primary"
                                to={`/daily-log/${dailyLog.id}`}
                            >
                                Ver detalhes
                            </Link>
                        </DailyLog>
                    </div>
                ))}
            </>
        );
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <div className="flex flex-wrap gap-4">
                <DailyLogForm />
                {content}
            </div>
        </div>
    );
}
