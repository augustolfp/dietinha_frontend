import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dailyLogFormSchema } from "../../../schemas/dailyLogSchemas";
import { Form } from "../../../components/Form";
import { useAddDailyLogMutation } from "../../../store/api/apiSlice";
import type { AddDailyLog as Inputs } from "../../../types/DailyLogTypes";

export default function DailyLogForm() {
    const [addDailyLog, { isLoading }] = useAddDailyLogMutation();

    const createDailyLogForm = useForm<Inputs>({
        resolver: zodResolver(dailyLogFormSchema),
    });

    const {
        handleSubmit,
        setError,
        formState: { errors },
    } = createDailyLogForm;

    const onSubmit: SubmitHandler<Inputs> = async ({
        date,
        notes,
        caloriesTarget,
        proteinsTarget,
    }) => {
        try {
            await addDailyLog({
                date,
                notes,
                caloriesTarget: Number(caloriesTarget),
                proteinsTarget: Number(proteinsTarget),
            }).unwrap();
        } catch (err: any) {
            let errMsg = "Erro inesperado na API. Recarregue a página.";
            if (err.status === 401) {
                errMsg =
                    "Suas credenciais estão inválidas. Recarregue a página.";
            }
            if (err.status === 403) {
                errMsg = "Usuário já tem um Log cadastrado na data fornecida.";
            }
            if (err.status === 422) {
                errMsg = "Dados preenchidos são inválidos.";
            }
            setError("root.serverError", {
                message: errMsg,
            });
        }
    };

    return (
        <div className="bg-white shadow-md p-4">
            <h2 className="font-semibold text-lg">New Daily Log</h2>
            <FormProvider {...createDailyLogForm}>
                <form
                    className="flex flex-col gap-3"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Form.InputWrapper>
                        <Form.Label htmlFor="date">Data</Form.Label>
                        <Form.Input
                            name="date"
                            type="text"
                            aria-invalid={errors.date ? "true" : "false"}
                            disabled={isLoading}
                        />
                        {errors.date && (
                            <Form.ErrorMessage message={errors.date.message} />
                        )}
                    </Form.InputWrapper>

                    <Form.InputWrapper>
                        <Form.Label htmlFor="notes">Anotações</Form.Label>
                        <Form.Input
                            name="notes"
                            type="text"
                            aria-invalid={errors.notes ? "true" : "false"}
                            disabled={isLoading}
                        />
                        {errors.notes && (
                            <Form.ErrorMessage message={errors.notes.message} />
                        )}
                    </Form.InputWrapper>

                    <Form.InputWrapper>
                        <Form.Label htmlFor="proteinsTarget">
                            Alvo de proteinas
                        </Form.Label>
                        <Form.Input
                            name="proteinsTarget"
                            type="number"
                            aria-invalid={
                                errors.proteinsTarget ? "true" : "false"
                            }
                            disabled={isLoading}
                        />
                        {errors.proteinsTarget && (
                            <Form.ErrorMessage
                                message={errors.proteinsTarget.message}
                            />
                        )}
                    </Form.InputWrapper>

                    <Form.InputWrapper>
                        <Form.Label htmlFor="caloriesTarget">
                            Alvo de calorias
                        </Form.Label>
                        <Form.Input
                            name="caloriesTarget"
                            type="number"
                            aria-invalid={
                                errors.caloriesTarget ? "true" : "false"
                            }
                            disabled={isLoading}
                        />
                        {errors.caloriesTarget && (
                            <Form.ErrorMessage
                                message={errors.caloriesTarget.message}
                            />
                        )}
                    </Form.InputWrapper>

                    <Form.SubmitButton disabled={isLoading}>
                        Adicionar Daily-log
                    </Form.SubmitButton>
                    {errors.root && (
                        <Form.ErrorMessage
                            message={errors.root.serverError.message}
                        />
                    )}
                </form>
            </FormProvider>
        </div>
    );
}
