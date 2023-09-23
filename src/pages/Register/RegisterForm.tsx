import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignUp from "../../hooks/authHooks/useSignUp";
import { registerFormSchema } from "../../schemas/credentialsSchemas";
import { Form } from "../../components/Form";

type Inputs = {
    displayName: string;
    email: string;
    password: string;
};

export default function RegisterForm() {
    const { isLoading, signUp } = useSignUp();

    const registerUserForm = useForm<Inputs>({
        resolver: zodResolver(registerFormSchema),
    });

    const {
        handleSubmit,
        setError,
        formState: { errors },
    } = registerUserForm;

    const onSubmit: SubmitHandler<Inputs> = async ({
        displayName,
        email,
        password,
    }) => {
        try {
            await signUp({ email, password, displayName });
        } catch (err) {
            setError("root.serverError", {
                message:
                    "Ocorreu um erro no Cadastro. Verifique suas credenciais.",
            });
        }
    };

    return (
        <FormProvider {...registerUserForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Form.InputWrapper>
                    <Form.Label htmlFor="displayName">Nome completo</Form.Label>
                    <Form.Input
                        name="displayName"
                        type="text"
                        aria-invalid={errors.displayName ? "true" : "false"}
                        disabled={isLoading}
                    />
                    {errors.displayName && (
                        <Form.ErrorMessage
                            message={errors.displayName.message}
                        />
                    )}
                </Form.InputWrapper>

                <Form.InputWrapper>
                    <Form.Label htmlFor="email">E-mail</Form.Label>
                    <Form.Input
                        name="email"
                        type="text"
                        aria-invalid={errors.email ? "true" : "false"}
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <Form.ErrorMessage message={errors.email.message} />
                    )}
                </Form.InputWrapper>

                <Form.InputWrapper>
                    <Form.Label htmlFor="password">Senha</Form.Label>
                    <Form.PasswordInput
                        aria-invalid={errors.password ? "true" : "false"}
                        disabled={isLoading}
                    />
                    {errors.password && (
                        <Form.ErrorMessage message={errors.password.message} />
                    )}
                </Form.InputWrapper>

                <Form.SubmitButton disabled={isLoading}>
                    Cadastrar
                </Form.SubmitButton>
                {errors.root && (
                    <Form.ErrorMessage
                        message={errors.root.serverError.message}
                    />
                )}
            </form>
        </FormProvider>
    );
}
