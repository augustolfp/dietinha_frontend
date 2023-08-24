import useUser from "../../hooks/authHooks/useUser";
import { useGetDailyLogByIdQuery } from "../../store/api/apiSlice";
import { useParams } from "react-router-dom";

export default function DailyLog() {
    const { dailyLogId } = useParams();
    const { accessToken } = useUser();

    const { data, isFetching, isSuccess } = useGetDailyLogByIdQuery(
        dailyLogId!,
        {
            skip: !Boolean(accessToken),
        }
    );

    let content;
    if (isFetching) {
        content = <div>Loading....</div>;
    } else if (isSuccess) {
        content = <div>{JSON.stringify(data)}</div>;
    }

    return (
        <div>
            <h1>Daily-log page!</h1>
            <h2>daily-log id is: {dailyLogId}</h2>
            {content}
        </div>
    );
}
