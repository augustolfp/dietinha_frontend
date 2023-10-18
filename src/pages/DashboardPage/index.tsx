import ContentContainer from "../../components/PageContainers/ContentContainer";
import useUser from "../../hooks/authHooks/useUser";
import { useGetDailyLogsQuery } from "../../store/api/apiSlice";
import DailyLogForm from "../../components/DailyLogForm";
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
        <ContentContainer>
            <div>
                <h1 className="text-3xl sm:text-5xl font-bold text-base-content mb-2">
                    Olá, usuário!
                </h1>
                <p className="text-lg sm:text-2xl font-light text-base-content">
                    Escolha uma data e comece a registrar suas calorias!
                </p>
            </div>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <DailyLogForm />
                </div>
            </div>
            <div>
                <h2 className="text-3xl font-extrabold text-base-content mb-2">
                    Registros
                </h2>
                <div className="flex flex-col gap-6">{content}</div>
            </div>
        </ContentContainer>
    );
}
