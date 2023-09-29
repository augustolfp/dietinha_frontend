interface Props {
    numerator: number;
    denominator: number;
    children?: React.ReactNode;
}

export default function RadialProgress({
    numerator,
    denominator,
    children,
}: Props) {
    const percentage = ((numerator / denominator) * 100).toFixed(0);

    return (
        <div className="flex items-center justify-center">
            <div
                className="radial-progress bg-primary text-primary-content border-4 border-primary"
                style={
                    {
                        "--value": `${percentage}`,
                        "--size": "100px",
                        "--thickness": "6px",
                    } as React.CSSProperties
                }
            >
                <p className="text-lg font-bold">{percentage}%</p>
            </div>
        </div>
    );
}
