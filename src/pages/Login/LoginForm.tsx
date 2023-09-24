import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignIn from "../../hooks/authHooks/useSignIn";
import {
    signInSchema,
    type SignInSchema,
} from "../../schemas/credentialsSchemas";

export default function LoginForm() {
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

    const onSubmit = async (data: SignInSchema) => {
        try {
            await signIn(data);
        } catch (err) {
            setError("root.serverError", {
                message:
                    "Ocorreu um erro no Login. Verifique suas credenciais.",
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
