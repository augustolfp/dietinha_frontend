import useUser from "../../hooks/authHooks/useUser";
import { useGetDailyLogsQuery } from "../../store/api/apiSlice";
import DailyLogForm from "../../components/DailyLogForm";
import BackgroundBlur from "./BackgroundBlur";
import DailyLogCard from "./DailyLogCard.tsx";

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
                    return <DailyLogCard key={dailyLog.id} {...dailyLog} />;
                })}
            </>
        );
    }

    return (
        <div className="bg-gradient-to-b from-base-300 to-base-100 w-full min-h-screen pt-6">
            <div className="container mx-auto flex flex-col gap-6 max-w-md p-3 sm:max-w-5xl sm:px-6 md:gap-10">
                <div className="relative">
                    <BackgroundBlur />
                    <div className="relative">
                        <h1 className="text-3xl sm:text-5xl font-bold text-base-content mb-2">
                            Olá, usuário!
                        </h1>
                        <p className="text-lg sm:text-2xl font-light text-base-content">
                            Escolha uma data e comece a registrar suas calorias!
                        </p>
                    </div>
                </div>
                <div className="card bg-white shadow-md">
                    <div className="card-body">
                        <DailyLogForm />
                    </div>
                </div>
                <div className="relative">
                    <h2 className="text-3xl font-extrabold text-base-content mb-2">
                        Registros
                    </h2>
                    <div className="flex flex-col gap-6">{content}</div>
                </div>
            </div>
        </div>
    );
}
