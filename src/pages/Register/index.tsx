import { Link } from "react-router-dom";
import RegisterWithGoogle from "./RegisterWithGoogle";
import RegisterForm from "./RegisterForm";

export default function Register() {
    return (
        <div>
            <div>
                <div>Cadastro</div>
                <RegisterForm />
                <RegisterWithGoogle />
                <Link to="/">Já tem uma conta? Faça login!</Link>
            </div>
        </div>
    );
}
