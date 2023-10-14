import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddDailyLogMutation } from "../../store/api/apiSlice";
import {
    dailyLogSchema,
    type DailyLogSchema,
} from "../../schemas/dailyLogSchemas";
import getApiErrorMessage from "../../services/getApiErrorMessage";
import { format } from "date-fns";
import Calendar from "./Calendar";
import ProteinsInput from "./ProteinsInput";

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

    const onSubmit: SubmitHandler<DailyLogSchema> = async (data) => {
        try {
            await addDailyLog({
                notes: data.notes,
                date: data.date,
                caloriesTarget: data.caloriesTarget,
                proteinsTarget: data.proteinsTarget,
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
                defaultValue={format(new Date(), "dd/MM/yyyy")}
                render={({ field: { onChange, value } }) => (
                    <div className="flex flex-col items-center">
                        <Calendar onChange={onChange} value={value} />
                        {errors.date && (
                            <p className="text-red-500">{`${errors.date.message}`}</p>
                        )}
                    </div>
                )}
            />
            <div className="divider divider-vertical"></div>
            <div className="flex flex-col gap-3">
                <Controller
                    control={control}
                    name="proteinsTarget"
                    defaultValue={150}
                    render={({ field: { onChange, value } }) => (
                        <ProteinsInput onChange={onChange} value={value} />
                    )}
                />
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
