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
    const calRest = 100 - truncCalPercent;
    const protRest = 100 - truncProtPercent;

    return (
        <div className="h-{346} w-12 flex flex-col-reverse gap-2 sm:flex-row sm:w-full sm:h-12 lg:h-20">
            <div className="w-full h-[50%] flex flex-col-reverse sm:w-[50%] sm:h-full sm:flex-row z-10">
                <div
                    className="bg-primary"
                    style={{
                        height: isMobile ? `${truncCalPercent}%` : "100%",
                        width: isMobile ? "100%" : `${truncCalPercent}%`,
                    }}
                ></div>
                <div
                    className="bg-primary-content"
                    style={{
                        height: isMobile ? `${calRest}%` : "100%",
                        width: isMobile ? "100%" : `${calRest}%`,
                    }}
                ></div>
            </div>
            <div className="w-full h-[50%] flex flex-col-reverse sm:w-[50%] sm:h-full sm:flex-row">
                <div
                    className="bg-secondary"
                    style={{
                        height: isMobile ? `${truncProtPercent}%` : "100%",
                        width: isMobile ? "100%" : `${truncProtPercent}%`,
                    }}
                ></div>
                <div
                    className="bg-secondary-content"
                    style={{
                        height: isMobile ? `${protRest}%` : "100%",
                        width: isMobile ? "100%" : `${protRest}%`,
                    }}
                ></div>
            </div>
        </div>
    );
}
