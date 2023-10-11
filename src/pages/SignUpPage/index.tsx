import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import HeroText from "../../components/HeroText";
import GoogleAuth from "../../components/GoogleAuth";
import BottomRightBlur from "../../components/Backgrounds/BottomRightBlur";

export default function SignUpPage() {
    return (
        <div className="h-[calc(100vh-64px)] w-full relative">
            <BottomRightBlur />
            <div className="container mx-auto pt-4 lg:pt-12">
                <div className="hero">
                    <div className="hero-content flex-col lg:flex-row max-w-sm md:max-w-md lg:max-w-4xl">
                        <HeroText />
                        <div className="card bg-base-100 shadow-xl p-5 flex flex-col gap-3 items-center w-full">
                            <h2 className="font-bold text-2xl">Cadastro</h2>
                            <SignUpForm />
                            <div className="divider text-sm">ou</div>
                            <GoogleAuth>Cadastre-se com o Google</GoogleAuth>
                            <Link to="/" className="link link-neutral">
                                Já tem uma conta? Faça login!
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
