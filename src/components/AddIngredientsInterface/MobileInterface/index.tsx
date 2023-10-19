import Drawer from "../../Drawer";
import AddIngredientTab from "../../AddIngredientTab";

interface Props {
    mealId: string;
}

export default function MobileInterface({ mealId }: Props) {
    return (
        <div className="flex justify-between items-center">
            <h2>Ingredientes</h2>
            <Drawer mealId={mealId}>
                <p>Mobile form</p>
                <AddIngredientTab mealId={mealId} />
            </Drawer>
        </div>
    );
}
