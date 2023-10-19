import { useGetMealSummaryQuery } from "../../store/api/apiSlice";
import useUser from "../../hooks/authHooks/useUser";
import MealStats from "../MealStats";

interface Props {
    mealId: string;
}

export default function Footer({ mealId }: Props) {
    const { accessToken } = useUser();
    const { data, error, isLoading } = useGetMealSummaryQuery(
        { id: mealId },
        { skip: !Boolean(accessToken) }
    );

    let footer;
    if (isLoading) {
        footer = <p>Loading...</p>;
    } else if (error) {
        footer = <p className="text-red-600">Error on fetching</p>;
    } else if (data) {
        footer = (
            <>
                <h3 className="font-medium text-neutral">
                    Logando em <strong>{data.name}</strong>
                </h3>
                <MealStats
                    kcals={data.kcals}
                    carbs={data.carbs}
                    proteins={data.proteins}
                    fats={data.fats}
                />
            </>
        );
    }

    return <div>{footer}</div>;
}
