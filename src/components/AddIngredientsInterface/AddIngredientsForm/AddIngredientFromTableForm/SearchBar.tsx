import { AiOutlineSearch } from "react-icons/ai";
import { DebounceInput } from "react-debounce-input";

interface Props {
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ value, onChange }: Props) {
    return (
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
    );
}
