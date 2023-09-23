import { Link } from "react-router-dom";
import LoginWithGoogle from "./LoginWithGoogle";
import LoginForm from "./LoginForm";

export default function Login() {
    return (
        <div>
            <div>
                <div>Login</div>
                <LoginForm />
                <LoginWithGoogle />
                <Link to="/register">
                    Ainda não tem uma conta? Cadastre-se!
                </Link>
            </div>
        </div>
    );
}
