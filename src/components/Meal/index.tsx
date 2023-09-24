import type { DetailedMeal } from "../../types/DailyLogTypes";
import Ingredient from "../../pages/DailyLog/Meal/Ingredient";
import IngredientForm from "../IngredientForm";

interface Props extends Omit<DetailedMeal, "createdAt" | "dailyLogId"> {}

export default function Meal(props: Props) {
    return (
        <div>
            <h3>{props.name}</h3>
            <ul>
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

            <h4>Ingredientes: </h4>
            <div>
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
