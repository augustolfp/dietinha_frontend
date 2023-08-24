import useUser from "../../hooks/authHooks/useUser";
import { useGetDailyLogByIdQuery } from "../../store/api/apiSlice";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Meal from "./Meal";

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
            <div>
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
                <div>
                    <h2 className="font-semibold text-xl">Refeições: </h2>
                    {data.mealsList.map((meal) => (
                        <Meal
                            key={meal.id}
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
        );
    }

    return (
        <div>
            <h1>Daily-log page!</h1>
            <h2>daily-log id is: {dailyLogId}</h2>
            {content}
        </div>
    );
}
