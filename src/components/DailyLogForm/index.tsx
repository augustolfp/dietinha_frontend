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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:justify-between">
                <Controller
                    control={control}
                    name="date"
                    defaultValue={format(new Date(), "dd/MM/yyyy")}
                    render={({ field: { onChange, value } }) => (
                        <Calendar
                            onChange={onChange}
                            value={value}
                            errorMessage={errors.date?.message}
                        />
                    )}
                />

                <div className="divider divider-vertical md:divider-horizontal"></div>

                <Controller
                    control={control}
                    name="proteinsTarget"
                    defaultValue={150}
                    render={({ field: { onChange, value } }) => (
                        <ProteinsInput
                            onChange={onChange}
                            value={value}
                            errorMessage={errors.proteinsTarget?.message}
                        />
                    )}
                />

                <div className="divider divider-vertical md:divider-horizontal"></div>

                <Controller
                    control={control}
                    name="caloriesTarget"
                    defaultValue={2500}
                    render={({ field: { onChange, value } }) => (
                        <CaloriesInput
                            onChange={onChange}
                            value={value}
                            errorMessage={errors.caloriesTarget?.message}
                        />
                    )}
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-neutral mt-6 md:my-auto md:ml-4"
                >
                    Adicionar
                </button>
            </div>
            {errors.root && (
                <p className="text-red-500 text-sm">{`${errors.root.serverError.message}`}</p>
            )}
        </form>
    );
}
