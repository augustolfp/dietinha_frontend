import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../../schemas/credentialsSchemas";
import { AuthForm } from "../../components/AuthForm";
import { useAppDispatch, useAppSelector } from "../../hooks/typedReduxHooks";
import { signInUser } from "../../store/slices/userSlice";

type Inputs = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector((state) => state.user.user);

    const createUserForm = useForm<Inputs>({
        resolver: zodResolver(loginFormSchema),
    });

    const {
        handleSubmit,
        setError,
        formState: { errors },
    } = createUserForm;

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
                        disabled={status === "loading"}
                    />
                    {errors.email && (
                        <AuthForm.ErrorMessage message={errors.email.message} />
                    )}
                </AuthForm.InputWrapper>

                <AuthForm.InputWrapper>
                    <AuthForm.Label htmlFor="password">Senha</AuthForm.Label>
                    <AuthForm.PasswordInput
                        aria-invalid={errors.password ? "true" : "false"}
                        disabled={status === "loading"}
                    />

                    {errors.password && (
                        <AuthForm.ErrorMessage
                            message={errors.password.message}
                        />
                    )}
                </AuthForm.InputWrapper>

                <AuthForm.SubmitButton disabled={status === "loading"}>
                    Entrar
                </AuthForm.SubmitButton>
                {status === "failed" && error && (
                    <AuthForm.ErrorMessage message={error} />
                )}
            </form>
        </FormProvider>
    );
}
