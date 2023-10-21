import { useState, useEffect, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { DebounceInput } from "react-debounce-input";

interface Props {
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
}

export default function SearchBar({ value, onChange, children }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        // const handleClickOutside = (e: MouseEvent) => {
        //     if (ref.current && !ref.current.contains(e.target as Node)) {
        //         setShowResults(false);
        //     }
        // };

        const handleClickOutside: { (e: MouseEvent): void } = (
            e: MouseEvent
        ) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [showResults]);

    return (
        <div ref={ref} onClick={() => setShowResults(true)}>
            <div className="join w-full">
                <DebounceInput
                    type="text"
                    minLength={3}
                    debounceTimeout={300}
                    value={value}
                    placeholder="Pesquise aqui"
                    onChange={(e) => onChange(e)}
                    className="input input-bordered join-item w-full"
                />
                <div className="join-item bg-base-300 text-base-content flex items-center px-4">
                    <AiOutlineSearch size={18} />
                </div>
            </div>
            {showResults && <div>{children}</div>}
        </div>
    );
}
