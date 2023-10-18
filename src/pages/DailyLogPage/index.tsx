import useUser from "../../hooks/authHooks/useUser";
import { useGetDailyLogStatsQuery } from "../../store/api/apiSlice";
import { useParams } from "react-router-dom";
import MealForm from "../../components/MealForm";
import formatDate from "../../utils/formatDate";
import MealsList from "./MealsList";
import MealsListItem from "./MealsList/MealsListItem";
import IngredientsList from "./IngredientsList";
import AddIngredientTab from "../../components/AddIngredientTab";
import DailyLogStats from "../../components/DailyLogStats";
import BackgroundBlur from "./BackgroundBlur";

export default function DailyLogPage() {
    const { dailyLogId } = useParams();

    const { accessToken } = useUser();
    const { data, error, isLoading } = useGetDailyLogStatsQuery(
        { id: dailyLogId! },
        {
            skip: !Boolean(accessToken),
        }
    );

    let header;
    let mealsList;
    if (isLoading) {
        header = <p>Loading...</p>;
        mealsList = <p>Loading...</p>;
    } else if (error) {
        header = <p className="text-red-600">Error on fetching</p>;
        mealsList = <p className="text-red-600">Error on fetching</p>;
    } else if (data) {
        const { formattedDate, weekDay } = formatDate(data.date);
        header = (
            <div>
                <div className="lg:flex lg:justify-between">
                    <h2 className="lg:text-3xl font-bold mb-6">{weekDay}</h2>
                    <p className="lg:text-3xl font-bold mb-6">
                        {formattedDate}
                    </p>
                </div>
            </div>
        );

        mealsList = (
            <MealsList>
                {data.mealsList.map((meal) => (
                    <MealsListItem key={meal.id} {...meal}>
                        <IngredientsList mealId={meal.id} />
                        <AddIngredientTab mealId={meal.id} />
                    </MealsListItem>
                ))}
            </MealsList>
        );
    }

    return (
        <div className="bg-gradient-to-b from-base-300 to-base-100 w-full min-h-screen pt-6">
            <div className="container mx-auto flex flex-col gap-6 max-w-md p-3 sm:max-w-5xl sm:px-6 md:gap-10">
                <div className="relative">
                    <BackgroundBlur />
                    <div className="relative flex flex-col gap-4">
                        {header}
                        <div className="bg-base-100 p-6 rounded-xl shadow-xl">
                            <DailyLogStats dailyLogId={dailyLogId!} />
                        </div>
                        <MealForm dailyLogId={dailyLogId!} />
                        <h2 className="text-xl font-bold">Refeições:</h2>
                        <div className="bg-base-100 shadow-xl rounded-xl p-4">
                            {mealsList}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
