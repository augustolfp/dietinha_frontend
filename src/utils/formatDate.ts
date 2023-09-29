import { getDay, format } from "date-fns";
const weekDaysInPt = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
];

export default function formatDate(dateStr: string) {
    const splitDate = dateStr.split("-");

    const day = Number(splitDate[2]);
    const month = Number(splitDate[1]) - 1;
    const year = Number(splitDate[0]);

    const dateObj = new Date(year, month, day);

    const formattedDate = format(dateObj, "dd/MM/yyyy");

    const weekDayIndex = getDay(dateObj);
    const weekDay = weekDaysInPt[weekDayIndex];

    return { formattedDate, weekDay };
}
