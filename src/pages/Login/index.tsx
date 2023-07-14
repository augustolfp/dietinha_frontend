import { Link } from "react-router-dom";
import LoginWithGoogle from "./LoginWithGoogle";
import LoginForm from "./LoginForm";

export default function Login() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <div className="font-bold">Login</div>
            <LoginForm />
            <LoginWithGoogle />
            <Link
                className=" text-xs text-pink-600 hover:text-pink-400"
                to="/register"
            >
                Ainda não tem uma conta? Cadastre-se!
            </Link>
        </div>
    );
}
