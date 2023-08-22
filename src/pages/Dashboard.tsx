import useUser from "../hooks/authHooks/useUser";
import { useGetDailyLogsQuery } from "../store/api/apiSlice";
import NewDailyLogForm from "../components/NewDailyLogForm";

export default function Dashboard() {
    const { accessToken } = useUser();
    const { data, isFetching, isSuccess } = useGetDailyLogsQuery(null, {
        skip: !Boolean(accessToken),
    });

    let content;
    if (isFetching) {
        content = <div>Loading....</div>;
    } else if (isSuccess) {
        content = <div>{JSON.stringify(data)}</div>;
    }

    return (
        <div className="flex flex-col items-center">
            <h2>Bem vindo a Dashboard!</h2>
            <NewDailyLogForm />
            <div className="bg-purple-300 p-4 m-4">
                <h3 className="font-semibold">Access Token:</h3>
                <p className="break-all">{accessToken}</p>
            </div>
            <div className="bg-purple-300 m-4 p-4">{content}</div>
        </div>
    );
}
