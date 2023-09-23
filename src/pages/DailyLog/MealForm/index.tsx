import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mealFormSchema } from "../../../schemas/mealsSchemas";
import { Form } from "../../../components/Form";
import { useAddMealMutation } from "../../../store/api/apiSlice";
import type { AddMeal } from "../../../types/DailyLogTypes";

type Inputs = Omit<AddMeal, "dailyLogId">;

interface Props {
    dailyLogId: string;
}

export default function MealForm({ dailyLogId }: Props) {
    const [addMeal, { isLoading }] = useAddMealMutation();

    const createMealForm = useForm<Inputs>({
        resolver: zodResolver(mealFormSchema),
    });

    const {
        handleSubmit,
        setError,
        formState: { errors },
    } = createMealForm;

    const onSubmit: SubmitHandler<Inputs> = async ({ name, description }) => {
        try {
            await addMeal({
                name,
                description,
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
        }
    };

    return (
        <div className="bg-white shadow-md p-4 mb-4">
            <h2 className="font-semibold text-lg mb-4">Adicionar refeição</h2>
            <FormProvider {...createMealForm}>
                <form
                    className="flex flex-col gap-3"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Form.InputWrapper>
                        <Form.Label htmlFor="name">Nome da refeição</Form.Label>
                        <Form.Input
                            name="name"
                            type="text"
                            aria-invalid={errors.name ? "true" : "false"}
                            disabled={isLoading}
                        />
                        {errors.name && (
                            <Form.ErrorMessage message={errors.name.message} />
                        )}
                    </Form.InputWrapper>

                    <Form.InputWrapper>
                        <Form.Label htmlFor="description">Descrição</Form.Label>
                        <Form.Input
                            name="description"
                            type="text"
                            aria-invalid={errors.description ? "true" : "false"}
                            disabled={isLoading}
                        />
                        {errors.description && (
                            <Form.ErrorMessage
                                message={errors.description.message}
                            />
                        )}
                    </Form.InputWrapper>

                    <Form.SubmitButton disabled={isLoading}>
                        Adicionar Refeição
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
