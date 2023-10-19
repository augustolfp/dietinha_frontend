import CollapseTitle from "./CollapseTitle";
import CollapseContent from "./CollapseContent";

interface Props {
    mealId: string;
}

export default function MealsListItem({ mealId }: Props) {
    return (
        <details className="collapse collapse-arrow">
            <CollapseTitle mealId={mealId} />
            <CollapseContent mealId={mealId} />
        </details>
    );
}
