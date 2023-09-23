import useUser from "../../hooks/authHooks/useUser";
import { useGetDailyLogByIdQuery } from "../../store/api/apiSlice";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Meal from "./Meal";
import MealForm from "./MealForm";

export default function DailyLog() {
    const { dailyLogId } = useParams();
    const { accessToken } = useUser();

    const { data, isFetching, isSuccess } = useGetDailyLogByIdQuery(
        dailyLogId!,
        {
            skip: !Boolean(accessToken),
        }
    );

    let content;
    if (isFetching) {
        content = <div>Loading....</div>;
    } else if (isSuccess) {
        content = (
            <>
                <Header
                    date={data.date}
                    notes={data.notes}
                    caloriesTarget={data.caloriesTarget}
                    proteinsTarget={data.proteinsTarget}
                    carbs={data.carbs}
                    fats={data.fats}
                    proteins={data.proteins}
                    kcals={data.kcals}
                />
                <MealForm dailyLogId={dailyLogId!} />
                <div className="bg-white shadow-md p-4">
                    <h2 className="font-semibold text-lg">Refeições: </h2>
                    <div className="m-4">
                        {data.mealsList.map((meal) => (
                            <Meal
                                key={meal.id}
                                id={meal.id}
                                name={meal.name}
                                description={meal.description}
                                carbs={meal.carbs}
                                fats={meal.fats}
                                proteins={meal.proteins}
                                kcals={meal.kcals}
                                ingredientsList={meal.ingredientsList}
                            />
                        ))}
                    </div>
                </div>
            </>
        );
    }

    return <div className="m-6">{content}</div>;
}
