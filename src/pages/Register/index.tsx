import { Link } from "react-router-dom";
import RegisterWithGoogle from "./RegisterWithGoogle";
import RegisterForm from "./RegisterForm";

export default function Register() {
    return (
        <div className="flex items-center justify-center">
            <div className="w-[360px] flex flex-col gap-4">
                <div className="font-bold text-center text-xl">Login</div>
                <RegisterForm />
                <RegisterWithGoogle />
                <Link
                    className=" text-xs text-center text-pink-600 hover:text-pink-400"
                    to="/"
                >
                    Já tem uma conta? Faça login!
                </Link>
            </div>
        </div>
    );
}
