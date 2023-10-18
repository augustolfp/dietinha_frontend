import { useGetMealSummaryQuery } from "../../../store/api/apiSlice";
import useUser from "../../../hooks/authHooks/useUser";
import { type Meal } from "../../../types";

interface Props extends Meal {
    children?: React.ReactNode;
}

export default function MealsListItem({ children, ...meal }: Props) {
    const { accessToken } = useUser();
    const { data, error, isLoading } = useGetMealSummaryQuery(
        { id: meal.id },
        { skip: !Boolean(accessToken) }
    );

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (error) {
        content = <p className="text-red-600">Error on fetching</p>;
    } else if (data) {
        content = (
            <div className="flex gap-x-3 text-base font-medium text-primary-focus">
                <div>{data.kcals}kcal</div>
                <div>{data.carbs}C</div>
                <div>{data.proteins}P</div>
                <div>{data.fats}G</div>
            </div>
        );
    }

    return (
        <details className="collapse collapse-arrow p-2">
            <summary className="collapse-title bg-[#DCE1FF] rounded-xl">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <h3 className="font-medium text-neutral">{meal.name}</h3>
                    {content}
                </div>
            </summary>
            <div className="collapse-content">{children}</div>
        </details>
    );
}
