import type { DailyLog as DailyLogType } from "../../types";
import DailyLog from "../../components/DailyLog";

interface Props extends DailyLogType {}

export default function Header(dailyLog: Props) {
    return (
        <div>
            <h2 className="text-xl font-bold">Resumo do dia:</h2>
            <DailyLog dailyLog={dailyLog} />
        </div>
    );
}
