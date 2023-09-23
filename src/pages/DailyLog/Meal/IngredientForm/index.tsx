import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ingredientFormSchema } from "../../../../schemas/ingredientsSchemas";
import { Form } from "../../../../components/Form";
import { useAddIngredientMutation } from "../../../../store/api/apiSlice";
import type { AddIngredient } from "../../../../types/DailyLogTypes";

type Inputs = Omit<AddIngredient, "mealId">;

interface Props {
    mealId: string;
}

export default function IngredientForm({ mealId }: Props) {
    const [addIngredient, { isLoading }] = useAddIngredientMutation();

    const createIngredientForm = useForm<Inputs>({
        resolver: zodResolver(ingredientFormSchema),
    });

    const {
        handleSubmit,
        setError,
        formState: { errors },
    } = createIngredientForm;

    const onSubmit: SubmitHandler<Inputs> = async ({
        name,
        weight,
        carbs,
        fats,
        proteins,
        kcals,
    }) => {
        try {
            console.log({
                name,
                mealId,
                weight,
                carbs,
                fats: Number(fats),
                proteins: Number(proteins),
                kcals: Number(kcals),
            });
            await addIngredient({
                name,
                mealId,
                weight: Number(weight),
                carbs: Number(carbs),
                fats: Number(fats),
                proteins: Number(proteins),
                kcals: Number(kcals),
            }).unwrap();
        } catch (err: any) {
            let errMsg = "Erro inesperado na API. Recarregue a página.";
            if (err.status === 401) {
                errMsg =
                    "Suas credenciais estão inválidas. Recarregue a página.";
            }
            if (err.status === 404) {
                errMsg = "Api não encontrou a refeição selecionada.";
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
        <div>
            <h3>Adicionar ingrediente</h3>
            <FormProvider {...createIngredientForm}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Form.InputWrapper>
                        <Form.Label htmlFor="name">
                            Nome do ingrediente
                        </Form.Label>
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
                        <Form.Label htmlFor="weight">
                            Quantidade (em g)
                        </Form.Label>
                        <Form.Input
                            name="weight"
                            type="number"
                            aria-invalid={errors.weight ? "true" : "false"}
                            disabled={isLoading}
                        />
                        {errors.weight && (
                            <Form.ErrorMessage
                                message={errors.weight.message}
                            />
                        )}
                    </Form.InputWrapper>

                    <Form.InputWrapper>
                        <Form.Label htmlFor="carbs">
                            Carboidratos (em g)
                        </Form.Label>
                        <Form.Input
                            name="carbs"
                            type="number"
                            aria-invalid={errors.carbs ? "true" : "false"}
                            disabled={isLoading}
                        />
                        {errors.carbs && (
                            <Form.ErrorMessage message={errors.carbs.message} />
                        )}
                    </Form.InputWrapper>

                    <Form.InputWrapper>
                        <Form.Label htmlFor="fats">Gorduras (em g)</Form.Label>
                        <Form.Input
                            name="fats"
                            type="number"
                            aria-invalid={errors.fats ? "true" : "false"}
                            disabled={isLoading}
                        />
                        {errors.fats && (
                            <Form.ErrorMessage message={errors.fats.message} />
                        )}
                    </Form.InputWrapper>

                    <Form.InputWrapper>
                        <Form.Label htmlFor="proteins">
                            Proteinas (em g)
                        </Form.Label>
                        <Form.Input
                            name="proteins"
                            type="number"
                            aria-invalid={errors.proteins ? "true" : "false"}
                            disabled={isLoading}
                        />
                        {errors.proteins && (
                            <Form.ErrorMessage
                                message={errors.proteins.message}
                            />
                        )}
                    </Form.InputWrapper>

                    <Form.InputWrapper>
                        <Form.Label htmlFor="kcals">Calorias</Form.Label>
                        <Form.Input
                            name="kcals"
                            type="number"
                            aria-invalid={errors.kcals ? "true" : "false"}
                            disabled={isLoading}
                        />
                        {errors.kcals && (
                            <Form.ErrorMessage message={errors.kcals.message} />
                        )}
                    </Form.InputWrapper>

                    <Form.SubmitButton disabled={isLoading}>
                        Adicionar ingrediente
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
