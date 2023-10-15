import { ChangeEventHandler, useState } from "react";
import { format, isValid, parse } from "date-fns";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import "react-day-picker/src/style.css";
import "./day-picker-custom-style.css";
import { BsCalendar3 } from "react-icons/bs";

interface Props {
    onChange: (event: string) => void;
    value: string;
    errorMessage: string | undefined;
}

export default function Calendar({
    onChange,
    value: inputValue,
    errorMessage,
}: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<Date>();

    const handleDropDown = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

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
        <div className="relative">
            <div className="flex justify-between md:flex-col">
                <label className="label">
                    <span className="label-text">Data</span>
                </label>
                <div className="join">
                    <input
                        className="input input-bordered join-item w-32"
                        type="text"
                        placeholder="dd/MM/aaaa"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button className="btn join-item" onClick={handleDropDown}>
                        <BsCalendar3 />
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="absolute right-0 md:left-0 md:-right-28 bg-base-100 p-4 shadow-xl rounded-box z-10">
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
            )}

            {errorMessage && (
                <p className="text-red-500 text-sm">{`${errorMessage}`}</p>
            )}
        </div>
    );
}
