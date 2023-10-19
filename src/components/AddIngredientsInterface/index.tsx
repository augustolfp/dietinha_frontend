import { useMediaQuery } from "../../hooks/useMediaQuery";
import DesktopInterface from "./DesktopInterface";
import MobileInterface from "./MobileInterface";

interface Props {
    mealId: string;
}

export default function AddIngredientsInterface({ mealId }: Props) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <div>
            {isDesktop ? (
                <DesktopInterface mealId={mealId} />
            ) : (
                <MobileInterface mealId={mealId} />
            )}
        </div>
    );
}
