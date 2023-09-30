import useUser from "../../hooks/authHooks/useUser";
import { useGetMealsQuery } from "../../store/api/apiSlice";
import MealsListItem from "../MealsListItem";
import IngredientsList from "../IngredientsList";
import IngredientForm from "../IngredientForm";
import AddIngredientTab from "../AddIngredientTab";

interface Props {
    dailyLogId: string;
}

export default function MealsList({ dailyLogId }: Props) {
    const { accessToken } = useUser();
    const { data, error, isLoading } = useGetMealsQuery(
        { id: dailyLogId! },
        { skip: !Boolean(accessToken) }
    );

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (error) {
        content = <p className="text-red-600">Error on fetching</p>;
    } else if (data) {
        content = data.map((meal) => {
            return (
                <MealsListItem
                    key={meal.id}
                    mealName={meal.name}
                    mealId={meal.id}
                >
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
    }

    return <div className="flex flex-col gap-y-4">{content}</div>;
}
