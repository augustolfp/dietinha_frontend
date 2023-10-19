import AddIngredientTab from "../../AddIngredientTab";

interface Props {
    mealId: string;
}

export default function DesktopInterface({ mealId }: Props) {
    return <AddIngredientTab mealId={mealId} />;
}
