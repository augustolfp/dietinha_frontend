import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignUp from "../../hooks/authHooks/useSignUp";
import {
    signUpSchema,
    type SignUpSchema,
} from "../../schemas/credentialsSchemas";
import getApiErrorMessage from "../../services/getApiErrorMessage";

export default function SignUpForm() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { signUp } = useSignUp();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
    });

    const togglePassword = (e: React.SyntheticEvent) => {
        e.preventDefault();

        setIsPasswordVisible(!isPasswordVisible);
    };

    const onSubmit = async (data: SignUpSchema) => {
        try {
            await signUp(data);
        } catch (err) {
            const errMessage = getApiErrorMessage(err);
            setError("root.serverError", {
                message: errMessage,
            });
            return;
        }

        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-control w-full">
            <label className="label">Nome</label>
            <input
                {...register("displayName")}
                type="text"
                placeholder="Nome completo"
                aria-invalid={errors.displayName ? "true" : "false"}
                className="input input-bordered w-full"
            />
            {errors.displayName && (
                <p className="text-red-500">{`${errors.displayName.message}`}</p>
            )}
            <label className="label">E-mail</label>
            <input
                {...register("email")}
                type="email"
                placeholder="Email"
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
                    placeholder="Password"
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
                className="btn btn-neutral mt-4"
            >
                Cadastrar
            </button>
            {errors.root && (
                <p className="text-red-500">{`${errors.root.serverError.message}`}</p>
            )}
        </form>
    );
}
