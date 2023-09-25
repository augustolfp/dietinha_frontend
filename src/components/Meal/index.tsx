import type { DetailedMeal } from "../../types/DailyLogTypes";
import Ingredient from "../Ingredient";
import IngredientForm from "../IngredientForm";

interface Props extends Omit<DetailedMeal, "createdAt" | "dailyLogId"> {}

export default function Meal(props: Props) {
    return (
        <div className="flex justify-between m-4 border-solid border-2 rounded-xl p-4">
            <div>
                <h3 className="text-lg font-bold">{props.name}</h3>
                <ul className="list-disc list-inside p-8">
                    <li>
                        <strong>Descrição: </strong>
                        {props.description
                            ? props.description
                            : "Sem descrição"}
                    </li>
                    <li>
                        <strong>Carboidratos: </strong>
                        {props.carbs} g
                    </li>
                    <li>
                        <strong>Gorduras: </strong>
                        {props.fats} g
                    </li>
                    <li>
                        <strong>Proteinas: </strong>
                        {props.proteins} g
                    </li>
                    <li>
                        <strong>Calorias: </strong>
                        {props.kcals} kcal
                    </li>
                </ul>
            </div>

            <div>
                <h3 className="text-md font-semibold mb-4">Ingredientes:</h3>
                {props.ingredientsList.map((ing) => (
                    <div>
                        <Ingredient
                            key={ing.id}
                            name={ing.name}
                            weight={ing.weight}
                            carbs={ing.carbs}
                            fats={ing.fats}
                            proteins={ing.proteins}
                            kcals={ing.kcals}
                        />
                    </div>
                ))}
            </div>

            <div className="card w-96 bg-base-100 shadow-xl p-4">
                <h3 className="text-md font-semibold mb-4">
                    Adicionar novo ingrediente:
                </h3>
                <IngredientForm mealId={props.id} />
            </div>
        </div>
    );
}
