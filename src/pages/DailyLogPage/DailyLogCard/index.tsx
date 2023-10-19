import DailyLogStats from "../../../components/DailyLogStats";

interface Props {
    dailyLogId: string;
}

export default function DailyLogCard({ dailyLogId }: Props) {
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <DailyLogStats dailyLogId={dailyLogId} />
            </div>
        </div>
    );
}
