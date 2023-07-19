import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import useSignUp from "../../hooks/authHooks/useSignUp";
import { registerFormSchema } from "../../schemas/credentialsSchemas";
import { AuthForm } from "../../components/AuthForm";
import { useAppDispatch, useAppSelector } from "../../hooks/typedReduxHooks";
import { signUpUser } from "../../store/slices/userSlice";

type Inputs = {
    displayName: string;
    email: string;
    password: string;
};

export default function RegisterForm() {
    // const { isLoading, signUp } = useSignUp();
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector((state) => state.user.user);

    const registerUserForm = useForm<Inputs>({
        resolver: zodResolver(registerFormSchema),
    });

    const {
        handleSubmit,
        setError,
        formState: { errors },
    } = registerUserForm;

    // const onSubmit: SubmitHandler<Inputs> = async ({
    //     displayName,
    //     email,
    //     password,
    // }) => {
    //     try {
    //         await signUp({ email, password, displayName });
    //     } catch (err) {
    //         setError("root.serverError", {
    //             message:
    //                 "Ocorreu um erro no Cadastro. Verifique suas credenciais.",
    //         });
    //     }
    // };

    const onSubmit: SubmitHandler<Inputs> = ({
        displayName,
        email,
        password,
    }) => {
        dispatch(signUpUser({ displayName, email, password }));
    };

    return (
        <FormProvider {...registerUserForm}>
            <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <AuthForm.InputWrapper>
                    <AuthForm.Label htmlFor="displayName">
                        Nome completo
                    </AuthForm.Label>
                    <AuthForm.Input
                        name="displayName"
                        type="text"
                        aria-invalid={errors.displayName ? "true" : "false"}
                        disabled={status === "loading"}
                    />
                    {errors.displayName && (
                        <AuthForm.ErrorMessage
                            message={errors.displayName.message}
                        />
                    )}
                </AuthForm.InputWrapper>

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
                    Cadastrar
                </AuthForm.SubmitButton>
                {status === "failed" && error && (
                    <AuthForm.ErrorMessage message={error} />
                )}
            </form>
        </FormProvider>
    );
}
