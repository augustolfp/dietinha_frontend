import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dailyLogFormSchema } from "../../schemas/dailyLogSchemas";
import { AuthForm } from "../AuthForm";
import { useAddDailyLogMutation } from "../../store/api/apiSlice";

type Inputs = {
    date: string;
    notes: string;
    caloriesTarget: number;
    proteinsTarget: number;
};

export default function NewDailyLogForm() {
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
        <div className="bg-purple-200 p-4">
            <h2 className="font-semibold text-lg">New Daily Log</h2>
            <FormProvider {...createDailyLogForm}>
                <form
                    className="flex flex-col gap-3"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <AuthForm.InputWrapper>
                        <AuthForm.Label htmlFor="date">Data</AuthForm.Label>
                        <AuthForm.Input
                            name="date"
                            type="text"
                            aria-invalid={errors.date ? "true" : "false"}
                            disabled={isLoading}
                        />
                        {errors.date && (
                            <AuthForm.ErrorMessage
                                message={errors.date.message}
                            />
                        )}
                    </AuthForm.InputWrapper>

                    <AuthForm.InputWrapper>
                        <AuthForm.Label htmlFor="notes">
                            Anotações
                        </AuthForm.Label>
                        <AuthForm.Input
                            name="notes"
                            type="text"
                            aria-invalid={errors.notes ? "true" : "false"}
                            disabled={isLoading}
                        />
                        {errors.notes && (
                            <AuthForm.ErrorMessage
                                message={errors.notes.message}
                            />
                        )}
                    </AuthForm.InputWrapper>

                    <AuthForm.InputWrapper>
                        <AuthForm.Label htmlFor="proteinsTarget">
                            Alvo de proteinas
                        </AuthForm.Label>
                        <AuthForm.Input
                            name="proteinsTarget"
                            type="number"
                            aria-invalid={
                                errors.proteinsTarget ? "true" : "false"
                            }
                            disabled={isLoading}
                        />
                        {errors.proteinsTarget && (
                            <AuthForm.ErrorMessage
                                message={errors.proteinsTarget.message}
                            />
                        )}
                    </AuthForm.InputWrapper>

                    <AuthForm.InputWrapper>
                        <AuthForm.Label htmlFor="caloriesTarget">
                            Alvo de calorias
                        </AuthForm.Label>
                        <AuthForm.Input
                            name="caloriesTarget"
                            type="number"
                            aria-invalid={
                                errors.caloriesTarget ? "true" : "false"
                            }
                            disabled={isLoading}
                        />
                        {errors.caloriesTarget && (
                            <AuthForm.ErrorMessage
                                message={errors.caloriesTarget.message}
                            />
                        )}
                    </AuthForm.InputWrapper>

                    <AuthForm.SubmitButton disabled={isLoading}>
                        Adicionar Daily-log
                    </AuthForm.SubmitButton>
                    {errors.root && (
                        <AuthForm.ErrorMessage
                            message={errors.root.serverError.message}
                        />
                    )}
                </form>
            </FormProvider>
        </div>
    );
}
