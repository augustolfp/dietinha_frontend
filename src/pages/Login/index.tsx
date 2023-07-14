import { Link } from "react-router-dom";
import LoginWithGoogle from "./LoginWithGoogle";
import LoginForm from "./LoginForm";

export default function Login() {
    return (
        <div className="flex items-center justify-center">
            <div className="w-[360px] flex flex-col gap-4">
                <div className="font-bold text-center text-xl">Login</div>
                <LoginForm />
                <LoginWithGoogle />
                <Link
                    className=" text-xs text-center text-pink-600 hover:text-pink-400"
                    to="/register"
                >
                    Ainda não tem uma conta? Cadastre-se!
                </Link>
            </div>
        </div>
    );
}
