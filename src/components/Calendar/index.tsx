import { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/src/style.css";

export default function Calendar() {
    const [selected, setSelected] = useState<Date>();

    let header = <>Selecione uma data</>;
    if (selected) {
        header = <>{format(selected, "yyyy-MM-dd")}</>;
    }

    return (
        <div>
            <div className="text-lg font-semibold text-center">{header}</div>
            <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
            />
        </div>
    );
}
