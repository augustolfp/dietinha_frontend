import IngredientsList from "../../../components/IngredientsList";
import AddIngredientsInterface from "../../../components/AddIngredientsInterface";

interface Props {
    mealId: string;
}

export default function CollapseMealContent({ mealId }: Props) {
    return (
        <div className="collapse-content">
            <div className="h-72">
                <div className="md:flex md: justify-between">
                    <AddIngredientsInterface mealId={mealId} />
                    <IngredientsList mealId={mealId} />
                </div>
            </div>
        </div>
    );
}
