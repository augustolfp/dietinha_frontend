import { useGetMealSummaryQuery } from "../../store/api/apiSlice";
import useUser from "../../hooks/authHooks/useUser";
import IngredientList from "../IngredientList";
import IngredientForm from "../IngredientForm";

interface Props {
    mealId: string;
}

export default function Meal({ mealId }: Props) {
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
        <>
            {content}
            <div>
                <h3 className="text-md font-semibold mb-4">Ingredientes:</h3>
                <IngredientList mealId={mealId} />
            </div>

            <div className="card w-96 bg-base-100 shadow-xl p-4">
                <h3 className="text-md font-semibold mb-4">
                    Adicionar novo ingrediente:
                </h3>
                <IngredientForm mealId={mealId} />
            </div>
        </>
    );
}
