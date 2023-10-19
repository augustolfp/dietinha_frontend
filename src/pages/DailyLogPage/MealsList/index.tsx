import useUser from "../../../hooks/authHooks/useUser";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { useGetDailyLogMealsQuery } from "../../../store/api/apiSlice";
import MealsListItem from "./MealsListItem";
import IngredientsList from "../../../components/IngredientsList";
import Drawer from "../../../components/Drawer";
import AddIngredientTab from "../../../components/AddIngredientTab";

interface Props {
    dailyLogId: string;
}

export default function MealsList({ dailyLogId }: Props) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
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
                        <div className="md:flex md: justify-between">
                            {isDesktop ? (
                                <div>
                                    <p>Desktop form</p>
                                    <AddIngredientTab mealId={meal.id} />
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <h2>Ingredientes</h2>
                                    <Drawer mealId={meal.id}>
                                        <p>Mobile form</p>
                                        <AddIngredientTab mealId={meal.id} />
                                    </Drawer>
                                </div>
                            )}
                            <IngredientsList mealId={meal.id} />
                        </div>
                    </MealsListItem>
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
