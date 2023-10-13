import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";

import { format, isValid, parse } from "date-fns";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import "react-day-picker/src/style.css";
import "./day-picker-custom-style.css";

interface Props {
    onChange: (event: string) => void;
}

export default function Calendar({ onChange }: Props) {
    const [selected, setSelected] = useState<Date>();
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputValue(e.currentTarget.value);
        const date = parse(e.currentTarget.value, "y-MM-dd", new Date());
        if (isValid(date)) {
            setSelected(date);
        } else {
            setSelected(undefined);
        }
    };

    const handleDaySelect: SelectSingleEventHandler = (date) => {
        setSelected(date);
        if (date) {
            setInputValue(format(date, "y-MM-dd"));
        } else {
            setInputValue("");
        }
    };

    useEffect(() => {
        onChange(inputValue);
    }, [inputValue]);

    return (
        <div>
            <input
                className="input input-bordered"
                type="text"
                placeholder={format(new Date(), "y-MM-dd")}
                value={inputValue}
                onChange={handleInputChange}
            />
            <DayPicker
                mode="single"
                defaultMonth={selected}
                selected={selected}
                onSelect={handleDaySelect}
                showOutsideDays
                fixedWeeks
            />
        </div>
    );
}
