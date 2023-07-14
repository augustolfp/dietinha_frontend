import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, SyntheticEvent } from "react";
import { DotWave } from "@uiball/loaders";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import useSignIn from "../../hooks/authHooks/useSignIn";
import { loginFormSchema } from "../../schemas/credentialsSchemas";

type Inputs = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const { isLoading, signIn } = useSignIn();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<Inputs>({ resolver: zodResolver(loginFormSchema) });

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

    const togglePasswordVisibility = (e: SyntheticEvent) => {
        e.preventDefault();
        setPasswordVisible(!passwordVisible);
    };

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
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
                <div className="flex items-center relative">
                    <input
                        className="w-full"
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        {...register("password")}
                        aria-invalid={errors.password ? "true" : "false"}
                        disabled={isLoading}
                    />
                    <div
                        className="absolute right-2"
                        onClick={togglePasswordVisibility}
                    >
                        {passwordVisible ? <BiSolidHide /> : <BiSolidShow />}
                    </div>
                </div>

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
    );
}
