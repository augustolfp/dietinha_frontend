import type { DetailedMeal } from "../../../types/DailyLogTypes";
import Ingredient from "./Ingredient";
import IngredientForm from "./IngredientForm";

interface Props extends Omit<DetailedMeal, "createdAt" | "dailyLogId"> {}

export default function Meal(props: Props) {
    return (
        <div className="bg-purple-200 p-4 m-4">
            <h3 className="font-semibold text-md">{props.name}</h3>
            <ul className="m-4">
                <li>
                    <strong>Descrição: </strong>
                    {props.description ? props.description : "Sem descrição"}
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

            <IngredientForm mealId={props.id} />

            <h4 className="font-semibold text-sm">Ingredientes: </h4>
            <div className="bg-purple-100 p-4 m-4">
                {props.ingredientsList.map((ing) => (
                    <Ingredient
                        key={ing.id}
                        name={ing.name}
                        weight={ing.weight}
                        carbs={ing.carbs}
                        fats={ing.fats}
                        proteins={ing.proteins}
                        kcals={ing.kcals}
                    />
                ))}
            </div>
        </div>
    );
}
