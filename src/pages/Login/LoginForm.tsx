import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignIn from "../../hooks/authHooks/useSignIn";
import { loginFormSchema } from "../../schemas/credentialsSchemas";
import { AuthForm } from "../../components/AuthForm";

type Inputs = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const { isLoading, signIn } = useSignIn();

    const createUserForm = useForm<Inputs>({
        resolver: zodResolver(loginFormSchema),
    });

    const {
        handleSubmit,
        setError,
        formState: { errors },
    } = createUserForm;

    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
        try {
            await signIn({ email, password });
        } catch (err) {
            setError("root.serverError", {
                message:
                    "Ocorreu um erro no Login. Verifique suas credenciais.",
            });
        }
    };

    return (
        <FormProvider {...createUserForm}>
            <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <AuthForm.InputWrapper>
                    <AuthForm.Label htmlFor="email">E-mail</AuthForm.Label>
                    <AuthForm.Input
                        name="email"
                        type="text"
                        aria-invalid={errors.email ? "true" : "false"}
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <p role="alert" className="text-xs text-red-700">
                            {errors.email.message}
                        </p>
                    )}
                </AuthForm.InputWrapper>

                <AuthForm.InputWrapper>
                    <AuthForm.Label htmlFor="password">Senha</AuthForm.Label>
                    <AuthForm.PasswordInput
                        aria-invalid={errors.password ? "true" : "false"}
                        disabled={isLoading}
                    />

                    {errors.password && (
                        <p role="alert" className="text-xs text-red-700">
                            {errors.password.message}
                        </p>
                    )}
                </AuthForm.InputWrapper>

                <AuthForm.SubmitButton disabled={isLoading}>
                    Entrar
                </AuthForm.SubmitButton>
                {errors.root && (
                    <p role="alert" className="text-xs text-red-700">
                        {errors.root.serverError.message}
                    </p>
                )}
            </form>
        </FormProvider>
    );
}
