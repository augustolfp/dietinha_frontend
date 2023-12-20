import { useState } from "react";
import { useAddIngredientMutation } from "../store/api/apiSlice";
import { type TableItem } from "../types";

export default function useAddIngredientFromTable(baseIngredient: TableItem | null, mealId: string) {
    const isEnabled = Boolean(baseIngredient)
    const [addIngredient, { isLoading, isUninitialized, isError, isSuccess, reset }] = useAddIngredientMutation();
    const [ingredientWeight, setIngredientWeight] = useState<number>(
        baseIngredient?.baseQty ?? 100
    );

    let name = "-"
    let kcals = 0
    let carbs = 0
    let proteins = 0
    let fats = 0

    if(baseIngredient) {
        name = baseIngredient.description
        kcals = (baseIngredient.kcals / baseIngredient.baseQty) * ingredientWeight;
        carbs = (baseIngredient.carbs / baseIngredient.baseQty) * ingredientWeight;
        proteins =
            (baseIngredient.proteins / baseIngredient.baseQty) * ingredientWeight;
        fats = (baseIngredient.fats / baseIngredient.baseQty) * ingredientWeight;
    }

    const calculatedIngredient = {
        name: name,
        weight: ingredientWeight,
        mealId,
        kcals,
        carbs,
        proteins,
        fats,
    }

    const changeIngredientWeight = (weight: number) => {
        setIngredientWeight(weight)
    }

    const addSelectedIngredient = () => {
        if (isEnabled) {
            addIngredient(calculatedIngredient)
        }
    }

    return {
        calculatedIngredient, changeIngredientWeight, addIngredient: addSelectedIngredient, isAddingIngredient: isLoading, isEnabled
    }
}