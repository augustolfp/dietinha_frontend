import useUser from "../../../hooks/authHooks/useUser";
import { useGetMealSummaryQuery } from "../../../store/api/apiSlice";
import MealStats from "../../../components/MealStats";

interface Props {
    mealId: string;
}

export default function CollapseMealTitle({ mealId }: Props) {
    const { accessToken } = useUser();
    const { data, error, isLoading } = useGetMealSummaryQuery(
        { id: mealId },
        { skip: !Boolean(accessToken) }
    );

    let mealResume;
    if (isLoading) {
        mealResume = <p>Loading...</p>;
    } else if (error) {
        mealResume = <p className="text-red-600">Error on fetching</p>;
    } else if (data) {
        mealResume = (
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
        <summary className="collapse-title bg-[#DCE1FF] rounded-xl">
            {mealResume}
        </summary>
    );
}
