import { Link } from "react-router-dom";
import SignUpWithGoogle from "./SignUpWithGoogle";
import SignUpForm from "./SignUpForm";
import HeroText from "../../components/HeroText";

export default function SignUpPage() {
    return (
        <div className="container mx-auto">
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <HeroText />
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h2 className="text-center font-bold">Cadastro</h2>
                            <SignUpForm />
                            <SignUpWithGoogle />
                            <Link to="/">Já tem uma conta? Faça login!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
