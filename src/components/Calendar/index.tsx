import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";

import { format, isValid, parse } from "date-fns";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import "react-day-picker/src/style.css";
import "./day-picker-custom-style.css";

interface Props {
    onChange: (event: string) => void;
    value: string;
}

export default function Calendar({ onChange, value: inputValue }: Props) {
    const [selected, setSelected] = useState<Date>();

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        onChange(e.currentTarget.value);
        const date = parse(e.currentTarget.value, "dd/MM/yyyy", new Date());
        if (isValid(date)) {
            setSelected(date);
        } else {
            setSelected(undefined);
        }
    };

    const handleDaySelect: SelectSingleEventHandler = (date) => {
        setSelected(date);
        if (date) {
            onChange(format(date, "dd/MM/yyyy"));
        } else {
            onChange("");
        }
    };

    return (
        <div>
            <input
                className="input input-bordered"
                type="text"
                placeholder={format(new Date(), "dd/MM/yyyy")}
                value={inputValue}
                onChange={handleInputChange}
            />
            <DayPicker
                locale={ptBR}
                mode="single"
                defaultMonth={selected}
                month={selected}
                selected={selected}
                onSelect={handleDaySelect}
                showOutsideDays
                fixedWeeks
            />
        </div>
    );
}
