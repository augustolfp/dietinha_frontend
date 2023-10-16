import { useGetMealSummaryQuery } from "../../../store/api/apiSlice";
import useUser from "../../../hooks/authHooks/useUser";

interface Props {
    mealId: string;
    mealName: string;
    children?: React.ReactNode;
}

export default function MealsListItem({ mealId, children, mealName }: Props) {
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
            <div className="flex justify-between gap-x-4">
                <div className="font-light">{data.kcals}kcal</div>
                <div className="font-light">{data.carbs}C</div>
                <div className="font-light">{data.proteins}P</div>
                <div className="font-light">{data.fats}G</div>
            </div>
        );
    }

    return (
        <details className="collapse collapse-arrow bg-base-200 border-solid border-2 border-black">
            <summary className="collapse-title text-xl font-medium">
                <div className="flex gap-x-6">
                    <h3 className="text-xl font-bold">{mealName}</h3>
                    {content}
                </div>
            </summary>
            <div className="collapse-content">{children}</div>
        </details>
    );
}
