import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddDailyLogMutation } from "../../store/api/apiSlice";
import {
    dailyLogSchema,
    type DailyLogSchema,
} from "../../schemas/dailyLogSchemas";
import getApiErrorMessage from "../../services/getApiErrorMessage";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/src/style.css";

export default function DailyLogForm() {
    const [addDailyLog] = useAddDailyLogMutation();

    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<DailyLogSchema>({
        resolver: zodResolver(dailyLogSchema),
    });

    const onSubmit = async (data: DailyLogSchema) => {
        try {
            await addDailyLog({
                notes: data.notes,
                date: format(data.date, "yyyy-MM-dd"),
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
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
        >
            <Controller
                control={control}
                name="date"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <div className="flex flex-col items-center col-span-2">
                        <div className="text-lg font-semibold">
                            {value
                                ? format(value, "dd/MM/yyyy")
                                : "Selecione uma Data"}
                        </div>
                        <DayPicker
                            mode="single"
                            onDayClick={onChange}
                            selected={value}
                        />
                        {errors.date && (
                            <p className="text-red-500">{`${errors.date.message}`}</p>
                        )}
                    </div>
                )}
            />

            <div className="col-span-1">
                <input
                    {...register("proteinsTarget")}
                    type="number"
                    placeholder="Alvo de proteinas"
                    aria-invalid={errors.proteinsTarget ? "true" : "false"}
                    className="w-full"
                />
                {errors.proteinsTarget && (
                    <p className="text-red-500">{`${errors.proteinsTarget.message}`}</p>
                )}
            </div>

            <div className="col-span-1">
                <input
                    {...register("caloriesTarget")}
                    type="number"
                    placeholder="Alvo de calorias"
                    aria-invalid={errors.caloriesTarget ? "true" : "false"}
                    className="w-full"
                />
                {errors.caloriesTarget && (
                    <p className="text-red-500">{`${errors.caloriesTarget.message}`}</p>
                )}
            </div>

            <div className="col-span-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full"
                >
                    Adicionar Daily-log
                </button>
                {errors.root && (
                    <p className="text-red-500">{`${errors.root.serverError.message}`}</p>
                )}
            </div>
        </form>
    );
}
