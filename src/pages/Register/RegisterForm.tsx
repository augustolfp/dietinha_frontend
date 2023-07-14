import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DotWave } from "@uiball/loaders";
import useSignUp from "../../hooks/authHooks/useSignUp";
import { registerFormSchema } from "../../schemas/credentialsSchemas";
import PasswordInput from "../../components/PasswordInput";

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
        register,
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
                <div className="flex flex-col gap-1">
                    <label htmlFor="name">Nome completo</label>
                    <input
                        id="name"
                        type="text"
                        {...register("name")}
                        aria-invalid={errors.name ? "true" : "false"}
                        disabled={isLoading}
                    />
                    {errors.name && (
                        <p role="alert" className="text-xs text-red-700">
                            {errors.name.message}
                        </p>
                    )}
                </div>
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
                    {isLoading ? <DotWave /> : "Cadastrar"}
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
