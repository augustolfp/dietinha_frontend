import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddIngredientMutation } from "../../store/api/apiSlice";
import {
    ingredientSchema,
    type IngredientSchema,
} from "../../schemas/ingredientsSchemas";
import {
    isFetchBaseQueryError,
    isErrorWithMessage,
    isMessageOnData,
} from "../../services/helpers";

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
    } = useForm<IngredientSchema>({
        resolver: zodResolver(ingredientSchema),
    });

    const onSubmit = async (data: IngredientSchema) => {
        try {
            await addIngredient({
                ...data,
                mealId,
                weight: Number(data.weight),
                carbs: Number(data.carbs),
                fats: Number(data.fats),
                proteins: Number(data.proteins),
                kcals: Number(data.kcals),
            }).unwrap();
        } catch (err) {
            if (isFetchBaseQueryError(err)) {
                if (isMessageOnData(err.data)) {
                    setError("root.serverError", {
                        message: err.data.message,
                    });
                    return;
                }
                setError("root.serverError", {
                    message: "Erro inesperado na API.",
                });
                return;
            }
            if (isErrorWithMessage(err)) {
                setError("root.serverError", {
                    message: err.message,
                });
                return;
            }
        }

        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-2"
        >
            <input
                {...register("name")}
                type="text"
                placeholder="Nome do ingrediente"
                aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
                <p className="text-red-500">{`${errors.name.message}`}</p>
            )}
            <input
                {...register("weight")}
                type="number"
                placeholder="Quantidade (g)"
                aria-invalid={errors.weight ? "true" : "false"}
            />
            {errors.weight && (
                <p className="text-red-500">{`${errors.weight.message}`}</p>
            )}
            <input
                {...register("carbs")}
                type="number"
                placeholder="Carboidratos (g)"
                aria-invalid={errors.carbs ? "true" : "false"}
            />
            {errors.carbs && (
                <p className="text-red-500">{`${errors.carbs.message}`}</p>
            )}
            <input
                {...register("fats")}
                type="number"
                placeholder="Gorduras (g)"
                aria-invalid={errors.fats ? "true" : "false"}
            />
            {errors.fats && (
                <p className="text-red-500">{`${errors.fats.message}`}</p>
            )}
            <input
                {...register("proteins")}
                type="number"
                placeholder="Proteinas (g)"
                aria-invalid={errors.proteins ? "true" : "false"}
            />
            {errors.proteins && (
                <p className="text-red-500">{`${errors.proteins.message}`}</p>
            )}
            <input
                {...register("kcals")}
                type="number"
                placeholder="Calorias (kCal)"
                aria-invalid={errors.kcals ? "true" : "false"}
            />
            {errors.kcals && (
                <p className="text-red-500">{`${errors.kcals.message}`}</p>
            )}
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
            >
                Adicionar ingrediente
            </button>
            {errors.root && (
                <p className="text-red-500">{`${errors.root.serverError.message}`}</p>
            )}
        </form>
    );
}
