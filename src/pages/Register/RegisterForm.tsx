import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignUp from "../../hooks/authHooks/useSignUp";
import { registerFormSchema } from "../../schemas/credentialsSchemas";
import { AuthForm } from "../../components/AuthForm";

type Inputs = {
    name: string;
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
        name,
        email,
        password,
    }) => {
        try {
            await signUp({ email, password });
        } catch (err) {
            setError("root.serverError", {
                message:
                    "Ocorreu um erro no Cadastro. Verifique suas credenciais.",
            });
        }
    };

    return (
        <FormProvider {...registerUserForm}>
            <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <AuthForm.InputWrapper>
                    <AuthForm.Label htmlFor="name">
                        Nome completo
                    </AuthForm.Label>
                    <AuthForm.Input
                        name="name"
                        type="text"
                        aria-invalid={errors.name ? "true" : "false"}
                        disabled={isLoading}
                    />
                    {errors.name && (
                        <AuthForm.ErrorMessage message={errors.name.message} />
                    )}
                </AuthForm.InputWrapper>

                <AuthForm.InputWrapper>
                    <AuthForm.Label htmlFor="email">E-mail</AuthForm.Label>
                    <AuthForm.Input
                        name="email"
                        type="text"
                        aria-invalid={errors.email ? "true" : "false"}
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <AuthForm.ErrorMessage message={errors.email.message} />
                    )}
                </AuthForm.InputWrapper>

                <AuthForm.InputWrapper>
                    <AuthForm.Label htmlFor="password">Senha</AuthForm.Label>
                    <AuthForm.PasswordInput
                        aria-invalid={errors.password ? "true" : "false"}
                        disabled={isLoading}
                    />
                    {errors.password && (
                        <AuthForm.ErrorMessage
                            message={errors.password.message}
                        />
                    )}
                </AuthForm.InputWrapper>

                <AuthForm.SubmitButton disabled={isLoading}>
                    Cadastrar
                </AuthForm.SubmitButton>
                {errors.root && (
                    <AuthForm.ErrorMessage
                        message={errors.root.serverError.message}
                    />
                )}
            </form>
        </FormProvider>
    );
}
