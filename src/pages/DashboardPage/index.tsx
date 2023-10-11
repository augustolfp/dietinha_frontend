import useUser from "../../hooks/authHooks/useUser";
import { Link } from "react-router-dom";
import { useGetDailyLogsQuery } from "../../store/api/apiSlice";
import DailyLogForm from "../../components/DailyLogForm";
import formatDate from "../../utils/formatDate";
import DailyLogStats from "../../components/DailyLogStats";
import { TbTrashXFilled } from "react-icons/tb";

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
                            <div className="card bg-base-100 shadow-md">
                                <div className="card-body">
                                    <div className="card-title flex justify-between">
                                        <h2 className="flex flex-col sm:flex-row gap-1">
                                            <span className="text-xl font-semibold">
                                                {weekDay},
                                            </span>
                                            <span className="text-lg font-medium sm:text-xl sm:font-semibold">
                                                {formattedDate}
                                            </span>
                                        </h2>
                                        <button className="btn btn-error aspect-square w-12">
                                            <TbTrashXFilled />
                                        </button>
                                    </div>
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
        <div className="bg-gradient-to-b from-base-300 to-base-100 w-full min-h-screen pt-6">
            <div className="container mx-auto flex flex-col gap-6 max-w-md p-3 sm:max-w-5xl sm:px-6 md:gap-10">
                <div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-base-content mb-2">
                        Olá, usuário!
                    </h1>
                    <p className="text-lg sm:text-2xl font-light text-base-content">
                        Escolha uma data e comece a registrar suas calorias!
                    </p>
                </div>
                <div className="card bg-white shadow-md">
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
            </div>
        </div>
    );
}
