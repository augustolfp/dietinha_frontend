import useUser from "../../hooks/authHooks/useUser";
import { useGetDailyLogsQuery } from "../../store/api/apiSlice";
import DailyLogForm from "./DailyLogForm";
import DashboardCard from "./DashboardCard";

export default function Dashboard() {
    const { accessToken } = useUser();
    const { data, isFetching, isSuccess } = useGetDailyLogsQuery(null, {
        skip: !Boolean(accessToken),
    });

    let content;
    if (isFetching) {
        content = <div>Loading....</div>;
    } else if (isSuccess) {
        content = (
            <>
                {data.map((dailyLog: any) => (
                    <DashboardCard {...dailyLog} />
                ))}
            </>
        );
    }

    return (
        <div className="m-6">
            <h2>Bem vindo a Dashboard!</h2>
            <div className="bg-purple-300 p-4 m-4">
                <h3 className="font-semibold">Access Token:</h3>
                <p className="break-all">{accessToken}</p>
            </div>
            <div className="flex flex-wrap gap-4 m-4">
                <DailyLogForm />
                {content}
            </div>
        </div>
    );
}
