import useUser from "../../../hooks/authHooks/useUser";
import { useGetDailyLogMealsQuery } from "../../../store/api/apiSlice";
import MealsListItem from "./MealsListItem";
import IngredientsList from "../IngredientsList";

interface Props {
    dailyLogId: string;
}

export default function MealsList({ dailyLogId }: Props) {
    const { accessToken } = useUser();
    const { data, error, isLoading } = useGetDailyLogMealsQuery(
        { id: dailyLogId },
        {
            skip: !Boolean(accessToken),
        }
    );

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (error) {
        content = <p className="text-red-600">Error on fetching</p>;
    } else if (data) {
        content = (
            <>
                {data.map((meal) => (
                    <MealsListItem key={meal.id} mealId={meal.id}>
                        <IngredientsList mealId={meal.id} />
                    </MealsListItem>
                ))}
            </>
        );
    }

    return (
        <>
            <h2 className="text-xl font-bold">Refeições:</h2>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">{content}</div>
            </div>
        </>
    );
}
