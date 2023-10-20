import { AiFillFire } from "react-icons/ai";
import { TbTrashXFilled } from "react-icons/tb";
import type { Ingredient as IngredientType } from "../../types";

interface Props {
    ingredient: IngredientType;
}

export default function IngredientsListItem({ ingredient }: Props) {
    return (
        <div className="flex items-center justify-between">
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

            <div className="flex items-center">
                <div className="text-sm font-bold text-info-content">
                    {ingredient.weight}g
                </div>
                <div className="divider divider-horizontal m-0"></div>
                <button className="btn btn-error btn-sm aspect-square p-0">
                    <TbTrashXFilled size={20} />
                </button>
            </div>
        </div>
    );
}
