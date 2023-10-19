import { useMediaQuery } from "../../hooks/useMediaQuery";
import AddIngredientTab from "../AddIngredientTab";
import Drawer from "../Drawer";

interface Props {
    mealId: string;
}

export default function AddIngredientsInterface({ mealId }: Props) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <div>
            {isDesktop ? (
                <div>
                    <p>Desktop form</p>
                    <AddIngredientTab mealId={mealId} />
                </div>
            ) : (
                <div className="flex justify-between items-center">
                    <h2>Ingredientes</h2>
                    <Drawer mealId={mealId}>
                        <p>Mobile form</p>
                        <AddIngredientTab mealId={mealId} />
                    </Drawer>
                </div>
            )}
        </div>
    );
}
