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
import CaloriesInput from "./CaloriesInput";

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
                    <Controller
                        control={control}
                        name="caloriesTarget"
                        defaultValue={2500}
                        render={({ field: { onChange, value } }) => (
                            <CaloriesInput onChange={onChange} value={value} />
                        )}
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
