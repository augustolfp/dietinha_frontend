import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignIn from "../../hooks/authHooks/useSignIn";
import { loginFormSchema } from "../../schemas/credentialsSchemas";
import { Form } from "../../components/Form";

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
                    Entrar
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
