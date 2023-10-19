import { useGetMealSummaryQuery } from "../../../store/api/apiSlice";
import useUser from "../../../hooks/authHooks/useUser";
import MealStats from "../../../components/MealStats";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import IngredientsList from "../../../components/IngredientsList";
import Drawer from "../../../components/Drawer";
import AddIngredientTab from "../../../components/AddIngredientTab";
import CollapseTitle from "./CollapseTitle";

interface Props {
    mealId: string;
}

export default function MealsListItem({ mealId }: Props) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <details className="collapse collapse-arrow">
            <CollapseTitle mealId={mealId} />
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
