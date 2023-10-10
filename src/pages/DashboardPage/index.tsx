import useUser from "../../hooks/authHooks/useUser";
import { Link } from "react-router-dom";
import { useGetDailyLogsQuery } from "../../store/api/apiSlice";
import DailyLogForm from "../../components/DailyLogForm";
import formatDate from "../../utils/formatDate";
import DailyLogStats from "../../components/DailyLogStats";

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
                            to={`/daily-log/${dailyLog.id}`}
                            key={dailyLog.id}
                        >
                            <div className="card bg-white shadow-md">
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {weekDay}, {formattedDate}
                                    </h2>
                                    <DailyLogStats dailyLogId={dailyLog.id} />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </>
        );
    }

    return (
        <div className="container mx-auto mt-4 flex flex-col max-w-5xl">
            <div className="card bg-white shadow-md">
                <div className="card-body">
                    <h2 className="card-title">Adicionar dia</h2>
                    <DailyLogForm />
                </div>
            </div>
            {content}
        </div>
    );
}
