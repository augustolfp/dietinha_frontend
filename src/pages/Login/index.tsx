import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState, SyntheticEvent } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import { Button } from "../../components/Button";

import LoginForm from "./LoginForm";

export default function Login() {
    const { isLoading, googleSignInCall } = useAuthentication();

    const handleGoogleLogin = async (e: SyntheticEvent) => {
        e.preventDefault();
        await googleSignInCall();
    };

    return (
        <div className="flex flex-col items-center">
            <div className=" bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">Login</div>
                <LoginForm />
                <Button.Root
                    className="auth-button bg-slate-200 text-zinc-700"
                    disabled={isLoading}
                    onClick={handleGoogleLogin}
                >
                    <FcGoogle />
                    <span>Logar com o Google</span>
                </Button.Root>
                <div className="text-pink-600 text-center hover:text-pink-400">
                    <Link to="/register">
                        Ainda não tem uma conta? Cadastre-se!
                    </Link>
                </div>
            </div>
        </div>
    );
}
