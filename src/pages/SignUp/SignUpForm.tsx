import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignUp from "../../hooks/authHooks/useSignUp";
import {
    signUpSchema,
    type SignUpSchema,
} from "../../schemas/credentialsSchemas";

export default function SignUpForm() {
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

    const onSubmit = async (data: SignUpSchema) => {
        try {
            await signUp(data);
        } catch (err) {
            setError("root.serverError", {
                message:
                    "Ocorreu um erro no Cadastro. Verifique suas credenciais.",
            });
            return;
        }

        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-2"
        >
            <input
                {...register("displayName")}
                type="text"
                placeholder="Nome completo"
                aria-invalid={errors.displayName ? "true" : "false"}
            />
            {errors.displayName && (
                <p className="text-red-500">{`${errors.displayName.message}`}</p>
            )}
            <input
                {...register("email")}
                type="email"
                placeholder="Email"
                aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
                <p className="text-red-500">{`${errors.email.message}`}</p>
            )}
            <input
                {...register("password")}
                type="password"
                placeholder="Password"
                aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
                <p className="text-red-500">{`${errors.password.message}`}</p>
            )}
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
            >
                Entrar
            </button>
            {errors.root && (
                <p className="text-red-500">{`${errors.root.serverError.message}`}</p>
            )}
        </form>
    );
}
