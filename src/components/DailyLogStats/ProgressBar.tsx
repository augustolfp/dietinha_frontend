import { useMediaQuery } from "../../hooks/useMediaQuery";
interface Props {
    caloriesPercentage: number;
    proteinsPercentage: number;
}

export default function ProgressBar({
    caloriesPercentage,
    proteinsPercentage,
}: Props) {
    const isMobile = !useMediaQuery("(min-width: 640px)");

    const truncCalPercent =
        Math.trunc(caloriesPercentage) > 100
            ? 100
            : Math.trunc(caloriesPercentage);
    const truncProtPercent =
        Math.trunc(proteinsPercentage) > 100
            ? 100
            : Math.trunc(proteinsPercentage);

    return (
        <div className="h-{346} w-12 flex flex-col gap-2 sm:flex-row sm:w-full sm:h-12 lg:h-20 lg:max-w-xs">
            <div className="w-full h-[50%] flex flex-col-reverse sm:w-[50%] sm:h-full sm:flex-row rounded-lg bg-primary-content">
                <div
                    className="bg-primary rounded-lg"
                    style={{
                        height: isMobile ? `${truncCalPercent}%` : "100%",
                        width: isMobile ? "100%" : `${truncCalPercent}%`,
                    }}
                ></div>
            </div>
            <div className="w-full h-[50%] flex flex-col-reverse sm:w-[50%] sm:h-full sm:flex-row rounded-lg bg-secondary-content">
                <div
                    className="bg-secondary rounded-lg"
                    style={{
                        height: isMobile ? `${truncProtPercent}%` : "100%",
                        width: isMobile ? "100%" : `${truncProtPercent}%`,
                    }}
                ></div>
            </div>
        </div>
    );
}
