import { AiFillFire } from "react-icons/ai";
import type { Ingredient as IngredientType } from "../../../types";

interface Props {
    ingredient: IngredientType;
}

export default function IngredientsListItem({ ingredient }: Props) {
    return (
        <>
            <div>
                <h4 className="text-md font-bold">{ingredient.name}</h4>
                <div className="flex gap-x-1">
                    <div className="flex items-center font-light text-sm">
                        {ingredient.kcals} <AiFillFire />
                    </div>
                    <div className="font-light text-sm">
                        {ingredient.carbs}C
                    </div>
                    <div className="font-light text-sm">
                        {ingredient.proteins}P
                    </div>
                    <div className="font-light text-sm">{ingredient.fats}G</div>
                </div>
            </div>
            <div className="badge badge-sm md:badge-md lg:badge-lg badge-info py-4 w-12 lg:w-16">
                {ingredient.weight}g
            </div>
        </>
    );
}
