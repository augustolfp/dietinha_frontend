import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import HeroText from "../../components/HeroText";
import GoogleAuth from "../../components/GoogleAuth";

export default function SignUpPage() {
    return (
        <div className="container mx-auto mt-4 md:mt-24">
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row max-w-sm md:max-w-md lg:max-w-4xl">
                    <HeroText />
                    <div className="flex flex-col gap-3 items-center w-full">
                        <h2 className="font-bold text-2xl">Cadastro</h2>
                        <SignUpForm />
                        <div className="divider text-sm">ou</div>
                        <GoogleAuth>Cadastre-se com o Google</GoogleAuth>
                        <Link to="/" className="link link-primary">
                            Já tem uma conta? Faça login!
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
