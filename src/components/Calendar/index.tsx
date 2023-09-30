import { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css ";
import "react-day-picker/src/style.css";

export default function Calendar() {
    const [selected, setSelected] = useState<Date>();

    let footer = <p>Please pick a day.</p>;
    if (selected) {
        footer = <p>You picked {format(selected, "PP")}.</p>;
    }

    return (
        <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            footer={footer}
        />
    );
}
