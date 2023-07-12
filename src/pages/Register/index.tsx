import { Link } from "react-router-dom";
import RegisterWithGoogle from "./RegisterWithGoogle";
import RegisterForm from "./RegisterForm";

export default function Register() {
    return (
        <div className="flex flex-col items-center">
            <div className=" bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">Cadastro</div>
                <RegisterForm />
                <RegisterWithGoogle />
                <div className="text-pink-600 text-center hover:text-pink-400">
                    <Link to="/">Já tem uma conta? Faça login!</Link>
                </div>
            </div>
        </div>
    );
}
