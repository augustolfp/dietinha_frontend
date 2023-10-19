import { useGetMealSummaryQuery } from "../../../store/api/apiSlice";
import useUser from "../../../hooks/authHooks/useUser";
import MealStats from "../../../components/MealStats";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import IngredientsList from "../../../components/IngredientsList";
import Drawer from "../../../components/Drawer";
import AddIngredientTab from "../../../components/AddIngredientTab";

interface Props {
    mealId: string;
}

export default function MealsListItem({ mealId }: Props) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const { accessToken } = useUser();
    const { data, error, isLoading } = useGetMealSummaryQuery(
        { id: mealId },
        { skip: !Boolean(accessToken) }
    );

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (error) {
        content = <p className="text-red-600">Error on fetching</p>;
    } else if (data) {
        content = (
            <div className="flex flex-col sm:flex-row sm:justify-between">
                <h3 className="font-medium text-neutral">{data.name}</h3>
                <MealStats
                    kcals={data.kcals}
                    carbs={data.carbs}
                    proteins={data.proteins}
                    fats={data.fats}
                />
            </div>
        );
    }

    return (
        <details className="collapse collapse-arrow">
            <summary className="collapse-title bg-[#DCE1FF] rounded-xl">
                {content}
            </summary>
            <div className="collapse-content">
                <div className="h-72">
                    <div className="md:flex md: justify-between">
                        {isDesktop ? (
                            <div>
                                <p>Desktop form</p>
                                <AddIngredientTab mealId={mealId} />
                            </div>
                        ) : (
                            <div className="flex justify-between items-center">
                                <h2>Ingredientes</h2>
                                <Drawer mealId={mealId}>
                                    <p>Mobile form</p>
                                    <AddIngredientTab mealId={mealId} />
                                </Drawer>
                            </div>
                        )}
                        <IngredientsList mealId={mealId} />
                    </div>
                </div>
            </div>
        </details>
    );
}
