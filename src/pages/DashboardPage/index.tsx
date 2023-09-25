import useUser from "../../hooks/authHooks/useUser";
import { useGetDailyLogsQuery } from "../../store/api/apiSlice";
import DailyLogForm from "../../components/DailyLogForm";
import DashboardCard from "./DashboardCard";

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
                    <DashboardCard key={dailyLog.id} dailyLog={dailyLog} />
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
