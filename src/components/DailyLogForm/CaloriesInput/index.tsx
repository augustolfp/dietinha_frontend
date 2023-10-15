interface Props {
    onChange: (event: number) => void;
    value: number;
    errorMessage: string | undefined;
}

export default function CaloriesInput({
    onChange,
    value,
    errorMessage,
}: Props) {
    const rangeMin = 0;
    const rangeMax = 6000;

    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between md:flex-col">
                <label className="label">
                    <span className="label-text">Alvo de calorias</span>
                </label>
                <div className="join">
                    <input
                        type="number"
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
                min={rangeMin}
                max={rangeMax}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="range range-primary range-sm"
            />
            {errorMessage && (
                <p className="text-red-500 text-sm">{`${errorMessage}`}</p>
            )}
        </div>
    );
}
