import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignIn from "../../hooks/authHooks/useSignIn";
import { loginFormSchema } from "../../schemas/credentialsSchemas";
import { AuthForm } from "../../components/AuthForm";
import { useAppDispatch } from "../../hooks/typedReduxHooks";
import { signInUser } from "../../store/slices/userSlice";

type Inputs = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const dispatch = useAppDispatch();
    const { isLoading, signIn } = useSignIn();

    const createUserForm = useForm<Inputs>({
        resolver: zodResolver(loginFormSchema),
    });

    const {
        handleSubmit,
        setError,
        formState: { errors },
    } = createUserForm;

    // const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    //     try {
    //         await signIn({ email, password });
    //     } catch (err) {
    //         setError("root.serverError", {
    //             message:
    //                 "Ocorreu um erro no Login. Verifique suas credenciais.",
    //         });
    //     }
    // };
    const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
        dispatch(signInUser({ email, password }));
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
                    Entrar
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
