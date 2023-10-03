import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignIn from "../../hooks/authHooks/useSignIn";
import {
    signInSchema,
    type SignInSchema,
} from "../../schemas/credentialsSchemas";
import getApiErrorMessage from "../../services/getApiErrorMessage";

export default function SignInForm() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { signIn } = useSignIn();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
    });

    const togglePassword = (e: React.SyntheticEvent) => {
        e.preventDefault();

        setIsPasswordVisible(!isPasswordVisible);
    };

    const onSubmit = async (data: SignInSchema) => {
        try {
            await signIn(data);
            reset();
        } catch (err) {
            const errMessage = getApiErrorMessage(err);
            setError("root.serverError", {
                message: errMessage,
            });
            return;
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-control w-full">
            <label className="label">E-mail</label>
            <input
                {...register("email")}
                placeholder="E-mail"
                aria-invalid={errors.email ? "true" : "false"}
                className="input input-bordered w-full"
            />
            {errors.email && (
                <p className="text-red-500">{`${errors.email.message}`}</p>
            )}
            <label className="label">Senha</label>
            <div className="join">
                <input
                    {...register("password")}
                    placeholder="Senha"
                    type={isPasswordVisible ? "text" : "password"}
                    aria-invalid={errors.password ? "true" : "false"}
                    className="input input-bordered join-item w-full"
                />
                <button
                    className="btn join-item rounded-r-full"
                    onClick={togglePassword}
                >
                    {isPasswordVisible ? "Esconder" : "Mostrar"}
                </button>
            </div>
            {errors.password && (
                <p className="text-red-500">{`${errors.password.message}`}</p>
            )}
            <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary mt-4"
            >
                Entrar
            </button>
            {errors.root && (
                <p className="text-red-500">{`${errors.root.serverError.message}`}</p>
            )}
        </form>
    );
}
