import MealsListItem from "./MealsListItem";
import IngredientsList from "../../../components/IngredientsList";
import AddIngredientTab from "../../../components/AddIngredientTab";
import { type Meal } from "../../../types";

interface Props {
    children?: React.ReactNode;
}

export default function MealsList({ children }: Props) {
    return <div className="flex flex-col">{children}</div>;
}
