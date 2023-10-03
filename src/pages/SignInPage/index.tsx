import { Link } from "react-router-dom";
import SignInForm from "./SignInForm";
import HeroText from "../../components/HeroText";
import GoogleAuth from "../../components/GoogleAuth";

export default function SignInPage() {
    return (
        <div className="container mx-auto mt-4 md:mt-24">
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row max-w-sm md:max-w-md lg:max-w-4xl">
                    <HeroText />
                    <div className="flex flex-col gap-3 items-center w-full">
                        <h2 className="font-bold text-2xl">Login</h2>
                        <SignInForm />
                        <div className="divider text-sm">ou</div>
                        <GoogleAuth>Logar com o Google</GoogleAuth>
                        <Link to="/sign-up" className="link link-primary">
                            Ainda não tem uma conta? Cadastre-se!
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
