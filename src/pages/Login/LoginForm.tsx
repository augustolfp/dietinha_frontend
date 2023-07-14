import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DotWave } from "@uiball/loaders";
import useSignIn from "../../hooks/authHooks/useSignIn";
import { loginFormSchema } from "../../schemas/credentialsSchemas";
import PasswordInput from "../../components/PasswordInput";

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
        register,
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
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        type="text"
                        {...register("email")}
                        aria-invalid={errors.email ? "true" : "false"}
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <p role="alert" className="text-xs text-red-700">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Senha</label>
                    <PasswordInput
                        aria-invalid={errors.password ? "true" : "false"}
                        disabled={isLoading}
                    />

                    {errors.password && (
                        <p role="alert" className="text-xs text-red-700">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="p-2 bg-pink-500 flex items-center justify-center"
                    disabled={isLoading}
                >
                    {isLoading ? <DotWave /> : "Entrar"}
                </button>
                {errors.root && (
                    <p role="alert" className="text-xs text-red-700">
                        {errors.root.serverError.message}
                    </p>
                )}
            </form>
        </FormProvider>
    );
}
