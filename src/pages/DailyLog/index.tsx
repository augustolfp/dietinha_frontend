import { useParams } from "react-router-dom";

export default function DailyLog() {
    const { dailyLogId } = useParams();
    return (
        <div>
            <h1>Daily-log page!</h1>
            <h2>daily-log id is: {dailyLogId}</h2>
        </div>
    );
}
