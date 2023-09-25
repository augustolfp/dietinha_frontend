import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddMealMutation } from "../../store/api/apiSlice";
import { mealSchema, type MealSchema } from "../../schemas/mealsSchemas";

interface Props {
    dailyLogId: string;
}

export default function MealForm({ dailyLogId }: Props) {
    const [addMeal] = useAddMealMutation();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<MealSchema>({
        resolver: zodResolver(mealSchema),
    });

    const onSubmit = async (data: MealSchema) => {
        try {
            await addMeal({
                ...data,
                dailyLogId,
            }).unwrap();
        } catch (err: any) {
            let errMsg = "Erro inesperado na API. Recarregue a página.";
            if (err.status === 401) {
                errMsg =
                    "Suas credenciais estão inválidas. Recarregue a página.";
            }
            if (err.status === 404) {
                errMsg = "Api não encontrou o dia selecionado.";
            }
            if (err.status === 422) {
                errMsg = "Dados preenchidos são inválidos.";
            }
            setError("root.serverError", {
                message: errMsg,
            });
            return;
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
                placeholder="Título"
                aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
                <p className="text-red-500">{`${errors.name.message}`}</p>
            )}
            <input
                {...register("description")}
                type="text"
                placeholder="Descrição"
                aria-invalid={errors.description ? "true" : "false"}
            />
            {errors.description && (
                <p className="text-red-500">{`${errors.description.message}`}</p>
            )}
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
            >
                Adicionar refeição
            </button>
            {errors.root && (
                <p className="text-red-500">{`${errors.root.serverError.message}`}</p>
            )}
        </form>
    );
}
