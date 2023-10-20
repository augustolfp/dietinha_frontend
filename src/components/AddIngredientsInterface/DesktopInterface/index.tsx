import AddIngredientsForm from "../AddIngredientsForm";

interface Props {
    mealId: string;
}

export default function DesktopInterface({ mealId }: Props) {
    return <AddIngredientsForm mealId={mealId} />;
}
