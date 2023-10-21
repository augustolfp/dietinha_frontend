import { useState } from "react";
import { useAddIngredientMutation } from "../store/api/apiSlice";
import { type TableItem } from "../types";

export default function useAddIngredientFromTable(baseIngredient: TableItem, mealId: string) {
    const [addIngredient, { isLoading, isUninitialized, isError, isSuccess, reset }] = useAddIngredientMutation();
    const [ingredientWeight, setIngredientWeight] = useState(
        baseIngredient.baseQty
    );

    const kcals = (baseIngredient.kcals / baseIngredient.baseQty) * ingredientWeight;
    const carbs = (baseIngredient.carbs / baseIngredient.baseQty) * ingredientWeight;
    const proteins =
        (baseIngredient.proteins / baseIngredient.baseQty) * ingredientWeight;
    const fats = (baseIngredient.fats / baseIngredient.baseQty) * ingredientWeight;

    const calculatedIngredient = {
        name: baseIngredient.description,
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
        addIngredient(calculatedIngredient)
    }

    return {
        calculatedIngredient, changeIngredientWeight, addIngredient: addSelectedIngredient, isAddingIngredient: isLoading
    }
}