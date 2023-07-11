import { Link } from "react-router-dom";
import LoginWithGoogle from "./LoginWithGoogle";
import LoginForm from "./LoginForm";

export default function Login() {
    return (
        <div className="flex flex-col items-center">
            <div className=" bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">Login</div>
                <LoginForm />
                <LoginWithGoogle />
                <div className="text-pink-600 text-center hover:text-pink-400">
                    <Link to="/register">
                        Ainda não tem uma conta? Cadastre-se!
                    </Link>
                </div>
            </div>
        </div>
    );
}
