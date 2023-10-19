import { useMediaQuery } from "../../../hooks/useMediaQuery";
import AddIngredientTab from "../../../components/AddIngredientTab";
import Drawer from "../../../components/Drawer";
import IngredientsList from "../../../components/IngredientsList";

interface Props {
    mealId: string;
}

export default function CollapseContent({ mealId }: Props) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
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
    );
}
