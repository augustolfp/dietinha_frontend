import { DayPicker } from "react-day-picker";
import { DayPickerSingleProps } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import "react-day-picker/src/style.css";
import "./day-picker-custom-style.css";

interface Props extends DayPickerSingleProps {}

export default function Calendar({ onDayClick, selected }: Props) {
    return (
        <DayPicker
            mode="single"
            locale={ptBR}
            onDayClick={onDayClick}
            selected={selected}
            showOutsideDays
            fixedWeeks
        />
    );
}
