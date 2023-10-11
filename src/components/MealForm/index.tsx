import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddMealMutation } from "../../store/api/apiSlice";
import { mealSchema, type MealSchema } from "../../schemas/mealsSchemas";
import getApiErrorMessage from "../../services/getApiErrorMessage";
import { FaArrowRight } from "react-icons/fa";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface Props {
    dailyLogId: string;
}

export default function MealForm({ dailyLogId }: Props) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
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
        <div className="w-full p-4 bg-base-100 shadow-xl rounded-lg">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3 md:flex-row md:items-center"
            >
                <h2 className="card-title">Adicionar refeição</h2>
                {isDesktop && (
                    <div className="text-base-content text-2xl">
                        <FaArrowRight />
                    </div>
                )}
                <input
                    {...register("name")}
                    type="text"
                    placeholder="Nome da refeição"
                    aria-invalid={errors.name ? "true" : "false"}
                    className="input input-bordered w-full"
                />
                {errors.name && (
                    <p className="text-red-500">{`${errors.name.message}`}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-neutral"
                >
                    Adicionar
                </button>
                {errors.root && (
                    <p className="text-red-500">{`${errors.root.serverError.message}`}</p>
                )}
            </form>
        </div>
    );
}
