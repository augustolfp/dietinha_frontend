import MealsListItem from "./MealsListItem";
import IngredientsList from "../../../components/IngredientsList";
import AddIngredientTab from "../../../components/AddIngredientTab";
import { type Meal } from "../../../types";

interface Props {
    mealsList: Meal[];
}

export default function MealsList({ mealsList }: Props) {
    const content = mealsList.map((meal) => {
        return (
            <MealsListItem key={meal.id} mealName={meal.name} mealId={meal.id}>
                <div className="mb-6">
                    <b>Descrição:</b> {meal.description}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-md font-semibold mb-4">
                            Ingredientes:
                        </h3>
                        <IngredientsList mealId={meal.id} />
                    </div>
                    <AddIngredientTab mealId={meal.id} />
                </div>
            </MealsListItem>
        );
    });

    return <div className="flex flex-col gap-y-4">{content}</div>;
}
