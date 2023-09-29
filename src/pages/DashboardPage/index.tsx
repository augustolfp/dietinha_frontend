import useUser from "../../hooks/authHooks/useUser";
import { Link } from "react-router-dom";
import { useGetDailyLogsQuery } from "../../store/api/apiSlice";
import DailyLogForm from "../../components/DailyLogForm";
import DailyLog from "../../components/DailyLog";
import formatDate from "../../utils/formatDate";

export default function DashboardPage() {
    const { accessToken } = useUser();

    const { data, error, isFetching } = useGetDailyLogsQuery(undefined, {
        skip: !Boolean(accessToken),
    });

    let content;
    if (isFetching) {
        content = <div>Loading....</div>;
    } else if (error) {
        content = <p className="text-red-600">Error on fetching</p>;
    } else if (data) {
        content = (
            <>
                {data.map((dailyLog) => {
                    const { formattedDate, weekDay } = formatDate(
                        dailyLog.date
                    );
                    return (
                        <Link
                            key={dailyLog.id}
                            to={`/daily-log/${dailyLog.id}`}
                            className="card bg-base-100 shadow-md hover:bg-slate-50"
                        >
                            <div className="card-body">
                                <h2 className="card-title">
                                    <p>{weekDay}</p>
                                    {formattedDate}
                                </h2>
                                <DailyLog dailyLogId={dailyLog.id} />
                            </div>
                        </Link>
                    );
                })}
            </>
        );
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="card bg-base-100 shadow-md row-span-2 lg:col-span-2 lg:row-span-1">
                    <div className="card-body">
                        <h2 className="card-title">Adicionar dia</h2>
                        <DailyLogForm />
                    </div>
                </div>
                {content}
            </div>
        </div>
    );
}
