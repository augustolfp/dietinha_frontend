import { Link } from "react-router-dom";
import LoginWithGoogle from "./LoginWithGoogle";
import LoginForm from "./LoginForm";

export default function Login() {
    return (
        <div className="container mx-auto">
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">
                            Conte suas Calorias, Sem Complicações
                        </h1>
                        <p className="py-6">
                            O aplicativo Dietinha oferece uma interface simples,
                            sem anúncios, e uma lista de alimentos pré-definidos
                            bem recheada. E o melhor: 100% grátis!
                        </p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h2 className="text-center font-bold">Login</h2>
                            <LoginForm />
                            <LoginWithGoogle />
                            <Link to="/register">
                                Ainda não tem uma conta? Cadastre-se!
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
