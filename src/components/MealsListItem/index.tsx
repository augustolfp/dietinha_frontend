import { useGetMealSummaryQuery } from "../../store/api/apiSlice";
import useUser from "../../hooks/authHooks/useUser";
import React from "react";

interface Props {
    mealId: string;
    children?: React.ReactNode;
}

export default function MealsListItem({ mealId, children }: Props) {
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
            <ul className="list-disc list-inside p-8">
                <li>
                    <strong>Carboidratos: </strong>
                    {data.carbs} g
                </li>
                <li>
                    <strong>Gorduras: </strong>
                    {data.fats} g
                </li>
                <li>
                    <strong>Proteinas: </strong>
                    {data.proteins} g
                </li>
                <li>
                    <strong>Calorias: </strong>
                    {data.kcals} kcal
                </li>
            </ul>
        );
    }

    return (
        <div className="flex">
            {content}
            {children}
        </div>
    );
}
