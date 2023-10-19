import useUser from "../../../hooks/authHooks/useUser";
import { useGetDailyLogMealsQuery } from "../../../store/api/apiSlice";
import CollapseMealTitle from "./CollapseMealTitle";
import CollapseMealContent from "./CollapseMealContent";

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
                    <details key={meal.id} className="collapse collapse-arrow">
                        <CollapseMealTitle mealId={meal.id} />
                        <CollapseMealContent mealId={meal.id} />
                    </details>
                ))}
            </>
        );
    }

    return (
        <>
            <h2 className="text-xl font-bold">Refeições:</h2>
            <div className="card card-compact bg-base-100 shadow-xl">
                <div className="card-body">{content}</div>
            </div>
        </>
    );
}
