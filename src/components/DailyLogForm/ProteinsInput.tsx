interface Props {
    onChange: (event: number) => void;
    value: string | number;
}

export default function ProteinsInput({ onChange, value }: Props) {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between">
                <label className="label">
                    <span className="label-text">Alvo de proteínas</span>
                </label>
                <div className="join">
                    <input
                        type="number"
                        min={0}
                        max={300}
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                        placeholder="150"
                        className="input input-bordered join-item w-20"
                    />
                    <div className="join-item bg-base-300 px-4 text-sm text-base-content flex items-center">
                        g
                    </div>
                </div>
            </div>
            <input
                type="range"
                min={0}
                max="300"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="range range-secondary range-sm"
            />
        </div>
    );
}
