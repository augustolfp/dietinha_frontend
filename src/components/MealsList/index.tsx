import useUser from "../../hooks/authHooks/useUser";
import { useGetMealsQuery } from "../../store/api/apiSlice";
import MealsListItem from "../MealsListItem";
import IngredientsList from "../IngredientsList";
import IngredientForm from "../IngredientForm";

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
                <div
                    key={meal.id}
                    className="flex m-4 gap-x-8 border-solid border-2 rounded-xl p-4"
                >
                    <div>
                        <h3 className="text-lg font-bold">{meal.name}</h3>
                        <div>
                            <b>Descrição:</b> {meal.description}
                        </div>
                    </div>

                    <div>
                        Sumário da refeição:
                        <MealsListItem mealId={meal.id}>
                            <div>
                                <h3 className="text-md font-semibold mb-4">
                                    Ingredientes:
                                </h3>
                                <IngredientsList mealId={meal.id} />
                            </div>
                            <div className="card w-96 bg-base-100 shadow-xl p-4">
                                <h3 className="text-md font-semibold mb-4">
                                    Adicionar novo ingrediente:
                                </h3>
                                <IngredientForm mealId={meal.id} />
                            </div>
                        </MealsListItem>
                    </div>
                </div>
            );
        });
    }

    return <>{content}</>;
}
