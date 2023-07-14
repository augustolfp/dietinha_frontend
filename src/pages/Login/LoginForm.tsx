import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, SyntheticEvent } from "react";
import { DotWave } from "@uiball/loaders";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import useSignIn from "../../hooks/authHooks/useSignIn";
import { loginFormSchema } from "../../schemas/loginFormSchema";

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
        formState: { errors },
    } = useForm<Inputs>({ resolver: zodResolver(loginFormSchema) });

    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
        try {
            await signIn({ email, password });
        } catch (err) {
            console.log("Ocorreu um erro no Login!");
        }
    };

    const togglePasswordVisibility = (e: SyntheticEvent) => {
        e.preventDefault();
        setPasswordVisible(!passwordVisible);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
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
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    {...register("password")}
                    aria-invalid={errors.password ? "true" : "false"}
                    disabled={isLoading}
                />
                <button onClick={togglePasswordVisibility}>
                    {passwordVisible ? <BiSolidHide /> : <BiSolidShow />}
                </button>

                {errors.password && (
                    <p role="alert" className="text-xs text-red-700">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="p-2 bg-pink-500"
                disabled={isLoading}
            >
                {isLoading ? <DotWave /> : "Entrar"}
            </button>
        </form>
    );
}
