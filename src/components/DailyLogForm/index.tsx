import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddDailyLogMutation } from "../../store/api/apiSlice";
import {
    dailyLogSchema,
    type DailyLogSchema,
} from "../../schemas/dailyLogSchemas";
import getApiErrorMessage from "../../services/getApiErrorMessage";

export default function DailyLogForm() {
    const [addDailyLog] = useAddDailyLogMutation();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<DailyLogSchema>({
        resolver: zodResolver(dailyLogSchema),
    });

    const onSubmit = async (data: DailyLogSchema) => {
        try {
            await addDailyLog({
                ...data,
                caloriesTarget: Number(data.caloriesTarget),
                proteinsTarget: Number(data.proteinsTarget),
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-2"
            >
                <input
                    {...register("date")}
                    type="text"
                    placeholder="Data"
                    aria-invalid={errors.date ? "true" : "false"}
                />
                {errors.date && (
                    <p className="text-red-500">{`${errors.date.message}`}</p>
                )}
                <input
                    {...register("notes")}
                    type="text"
                    placeholder="Anotações"
                    aria-invalid={errors.notes ? "true" : "false"}
                />
                {errors.notes && (
                    <p className="text-red-500">{`${errors.notes.message}`}</p>
                )}
                <input
                    {...register("proteinsTarget")}
                    type="number"
                    placeholder="Alvo de proteinas"
                    aria-invalid={errors.proteinsTarget ? "true" : "false"}
                />
                {errors.proteinsTarget && (
                    <p className="text-red-500">{`${errors.proteinsTarget.message}`}</p>
                )}
                <input
                    {...register("caloriesTarget")}
                    type="number"
                    placeholder="Alvo de calorias"
                    aria-invalid={errors.caloriesTarget ? "true" : "false"}
                />
                {errors.caloriesTarget && (
                    <p className="text-red-500">{`${errors.caloriesTarget.message}`}</p>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
                >
                    Adicionar Daily-log
                </button>
                {errors.root && (
                    <p className="text-red-500">{`${errors.root.serverError.message}`}</p>
                )}
            </form>
            <div className="bg-pink-300 py-20 flex items-center justify-center font-bold text-sm break-all">
                CALENDÁRIO FICARÁ AQUI
            </div>
        </div>
    );
}
