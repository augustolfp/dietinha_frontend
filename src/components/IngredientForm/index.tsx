import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddIngredientMutation } from "../../store/api/apiSlice";
import {
    ingredientSchema,
    type IngredientSchema,
} from "../../schemas/ingredientsSchemas";
import getApiErrorMessage from "../../services/getApiErrorMessage";

interface Props {
    mealId: string;
}

export default function IngredientForm({ mealId }: Props) {
    const [addIngredient] = useAddIngredientMutation();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm<IngredientSchema>({
        resolver: zodResolver(ingredientSchema),
    });

    const watchCarbs = watch("carbs", 0);
    const watchFats = watch("fats", 0);
    const watchProteins = watch("proteins", 0);
    const calories = watchProteins * 4 + watchFats * 9 + watchCarbs * 4;

    const onSubmit = async (data: IngredientSchema) => {
        try {
            await addIngredient({
                ...data,
                mealId,
                weight: Number(data.weight),
                carbs: Number(data.carbs),
                fats: Number(data.fats),
                proteins: Number(data.proteins),
                kcals: calories,
            }).unwrap();
        } catch (err) {
            const errMessage = getApiErrorMessage(err);
            setError("root.serverError", {
                message: errMessage,
            });
            return;
        }

        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-3 gap-2"
        >
            <div className="col-span-2">
                <label>
                    Nome do ingrediente
                    <input
                        {...register("name")}
                        type="text"
                        placeholder="Nome do ingrediente"
                        aria-invalid={errors.name ? "true" : "false"}
                        className="w-full"
                    />
                </label>
                {errors.name && (
                    <p className="text-red-500">{`${errors.name.message}`}</p>
                )}
            </div>
            <div className="col-span-1">
                <label>
                    Quantidade
                    <input
                        {...register("weight")}
                        type="number"
                        placeholder="Quantidade (g)"
                        aria-invalid={errors.weight ? "true" : "false"}
                        className="w-full"
                    />
                </label>
                {errors.weight && (
                    <p className="text-red-500">{`${errors.weight.message}`}</p>
                )}
            </div>
            <div className="">
                <label>
                    Carboidratos
                    <input
                        {...register("carbs")}
                        type="number"
                        placeholder="Carboidratos (g)"
                        aria-invalid={errors.carbs ? "true" : "false"}
                        className="w-full"
                    />
                </label>
                {errors.carbs && (
                    <p className="text-red-500">{`${errors.carbs.message}`}</p>
                )}
            </div>
            <div className="">
                <label>
                    Proteínas
                    <input
                        {...register("proteins")}
                        type="number"
                        placeholder="Proteínas (g)"
                        aria-invalid={errors.proteins ? "true" : "false"}
                        className="w-full"
                    />
                </label>
                {errors.proteins && (
                    <p className="text-red-500">{`${errors.proteins.message}`}</p>
                )}
            </div>
            <div className="">
                <label>
                    Gorduras
                    <input
                        {...register("fats")}
                        type="number"
                        placeholder="Gorduras (g)"
                        aria-invalid={errors.fats ? "true" : "false"}
                        className="w-full"
                    />
                </label>
                {errors.fats && (
                    <p className="text-red-500">{`${errors.fats.message}`}</p>
                )}
            </div>
            <div className="row-span-2 flex items-center justify-center">
                {calories}kcal
            </div>
            <div className="col-span-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full"
                >
                    Adicionar e Favoritar
                </button>
                {errors.root && (
                    <p className="text-red-500">{`${errors.root.serverError.message}`}</p>
                )}
            </div>
            <div className="col-span-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-secondary w-full"
                >
                    Apenas adicionar
                </button>
            </div>
        </form>
    );
}
