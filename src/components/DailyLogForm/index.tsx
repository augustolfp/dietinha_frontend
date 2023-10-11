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
            className="flex flex-col gap-3 sm:flex-row sm:justify-between"
        >
            <Controller
                control={control}
                name="date"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <div className="flex flex-col">
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
            <div className="divider divider-vertical"></div>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <label className="label">
                            <span className="label-text">
                                Alvo de proteínas
                            </span>
                        </label>
                        <div className="join">
                            <input
                                {...register("proteinsTarget")}
                                type="number"
                                placeholder="150"
                                aria-invalid={
                                    errors.proteinsTarget ? "true" : "false"
                                }
                                className="input input-bordered join-item w-20"
                            />
                            <div className="join-item bg-base-300 px-4 text-sm text-base-content flex items-center">
                                g
                            </div>
                        </div>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max="100"
                        value="40"
                        readOnly={true}
                        className="range range-secondary range-sm"
                    />
                    {errors.proteinsTarget && (
                        <p className="text-red-500">{`${errors.proteinsTarget.message}`}</p>
                    )}
                </div>

                <div className="divider divider-vertical"></div>

                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <label className="label">
                            <span className="label-text">Alvo de calorias</span>
                        </label>
                        <div className="join">
                            <input
                                {...register("caloriesTarget")}
                                type="number"
                                placeholder="2600"
                                aria-invalid={
                                    errors.caloriesTarget ? "true" : "false"
                                }
                                className="input input-bordered join-item w-24"
                            />
                            <div className="join-item bg-base-300 px-4 text-sm text-base-content flex items-center">
                                kcal
                            </div>
                        </div>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max="100"
                        value="40"
                        readOnly={true}
                        className="range range-primary range-sm"
                    />
                    {errors.caloriesTarget && (
                        <p className="text-red-500">{`${errors.caloriesTarget.message}`}</p>
                    )}
                </div>

                <div className="">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-neutral w-full"
                    >
                        Adicionar
                    </button>
                    {errors.root && (
                        <p className="text-red-500">{`${errors.root.serverError.message}`}</p>
                    )}
                </div>
            </div>
        </form>
    );
}
