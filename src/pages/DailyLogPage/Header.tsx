import DailyLog from "../../components/DailyLog";

interface Props {
    dailyLogId: string;
}

export default function Header({ dailyLogId }: Props) {
    return (
        <div>
            <h2 className="text-xl font-bold">Resumo do dia:</h2>
            <DailyLog dailyLogId={dailyLogId} />
        </div>
    );
}
