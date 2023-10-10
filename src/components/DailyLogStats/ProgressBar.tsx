interface Props {
    caloriesPercentage: number;
    proteinsPercentage: number;
}

export default function ProgressBar({
    caloriesPercentage,
    proteinsPercentage,
}: Props) {
    const truncCalPercent = Math.trunc(caloriesPercentage);
    const calRest = 100 - truncCalPercent;
    const truncProtPercent = Math.trunc(proteinsPercentage);
    const protRest = 100 - truncProtPercent;

    return (
        <div className="h-{346} w-10 sm:w-full sm:h-10 lg:h-20 p-0 flex flex-col-reverse sm:flex-row gap-2">
            <div className="w-full h-[50%] flex flex-col-reverse">
                <div
                    className="bg-primary w-full"
                    style={{ height: `${truncCalPercent}%` }}
                ></div>
                <div
                    className="bg-primary-content w-full"
                    style={{ height: `${calRest}%` }}
                ></div>
            </div>
            <div className="w-full h-[50%] flex flex-col-reverse">
                <div
                    className="bg-secondary w-full"
                    style={{ height: `${truncProtPercent}%` }}
                ></div>
                <div
                    className="bg-secondary-content w-full"
                    style={{ height: `${protRest}%` }}
                ></div>
            </div>
        </div>
    );
}
