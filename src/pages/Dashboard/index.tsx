import useUser from "../../hooks/authHooks/useUser";
import { useGetDailyLogsQuery } from "../../store/api/apiSlice";
import DailyLogForm from "./DailyLogForm";
import DashboardCard from "./DashboardCard";

export default function Dashboard() {
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
                    <DashboardCard key={dailyLog.id} dailyLog={dailyLog} />
                ))}
            </>
        );
    }

    return (
        <div className="m-6">
            <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
            <div className="flex flex-wrap gap-4">
                <DailyLogForm />
                {content}
            </div>
        </div>
    );
}
