interface Props {
    onChange: (event: number) => void;
    value: number;
}

export default function CaloriesInput({ onChange, value }: Props) {
    const inputMin = 0;
    const inputMax = 5000;

    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between">
                <label className="label">
                    <span className="label-text">Alvo de calorias</span>
                </label>
                <div className="join">
                    <input
                        type="number"
                        min={inputMin}
                        max={inputMax}
                        value={value || ""}
                        onChange={(e) => {
                            if (e.target.value) {
                                onChange(parseInt(e.target.value));
                            } else {
                                onChange(0);
                            }
                        }}
                        placeholder="0"
                        className="input input-bordered join-item w-24"
                    />
                    <div className="join-item bg-base-300 px-4 text-sm text-base-content flex items-center">
                        kcal
                    </div>
                </div>
            </div>
            <input
                type="range"
                min={inputMin}
                max={inputMax}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="range range-primary range-sm"
            />
        </div>
    );
}
