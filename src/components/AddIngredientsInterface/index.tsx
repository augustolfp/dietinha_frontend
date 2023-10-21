import { useMediaQuery } from "../../hooks/useMediaQuery";
import DesktopInterface from "./DesktopInterface";
import MobileInterface from "./MobileInterface";
import AddIngredientsForm from "./AddIngredientsForm";

interface Props {
    mealId: string;
}

export default function AddIngredientsInterface({ mealId }: Props) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <div>
            {isDesktop ? (
                <DesktopInterface>
                    <AddIngredientsForm mealId={mealId} />
                </DesktopInterface>
            ) : (
                <MobileInterface mealId={mealId}>
                    <AddIngredientsForm mealId={mealId} />
                </MobileInterface>
            )}
        </div>
    );
}
