import formatDate from "../../../utils/formatDate";

interface Props {
    date: string;
}

export default function DailyLogHeader({ date }: Props) {
    const { formattedDate, weekDay } = formatDate(date);

    return (
        <div className="lg:flex lg:justify-between">
            <h2 className="lg:text-3xl font-bold mb-6">{weekDay}</h2>
            <p className="lg:text-3xl font-bold mb-6">{formattedDate}</p>
        </div>
    );
}
