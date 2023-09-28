import type { Meal as DetailedMeal } from "../../types";
import Ingredient from "../Ingredient";
import IngredientForm from "../IngredientForm";
import { useGetMealSummaryQuery } from "../../store/api/apiSlice";
import useUser from "../../hooks/authHooks/useUser";

interface Props {
    id: string;
}

export default function Meal({ id }: Props) {
    const { accessToken } = useUser();
    const { data, error, isLoading } = useGetMealSummaryQuery(
        { id: id },
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
        <div className="flex justify-between m-4 border-solid border-2 rounded-xl p-4">
            <div>
                {/* <h3 className="text-lg font-bold">{props.name}</h3> */}
                {content}
            </div>

            {/* <div>
                <h3 className="text-md font-semibold mb-4">Ingredientes:</h3>
                {props.ingredientsList.map((ing) => (
                    <Ingredient key={ing.id} {...ing} />
                ))}
            </div>

            <div className="card w-96 bg-base-100 shadow-xl p-4">
                <h3 className="text-md font-semibold mb-4">
                    Adicionar novo ingrediente:
                </h3>
                <IngredientForm mealId={props.id} />
            </div> */}
        </div>
    );
}
