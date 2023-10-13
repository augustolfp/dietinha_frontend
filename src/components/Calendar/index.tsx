import { DayPicker, useInput } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import "react-day-picker/src/style.css";
import "./day-picker-custom-style.css";

export default function Calendar() {
    const { inputProps, dayPickerProps } = useInput({
        defaultSelected: new Date(),
        format: "dd/MM/yyyy",
        locale: ptBR,
        required: true,
    });

    return (
        <div>
            <input {...inputProps} className="input input-bordered" />
            <DayPicker {...dayPickerProps} showOutsideDays fixedWeeks />
        </div>
    );
}
