import CredentialsContainer from "../../components/PageContainers/CredentialsContainer";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import HeroText from "../../components/HeroText";
import GoogleAuth from "../../components/GoogleAuth";

export default function SignUpPage() {
    return (
        <CredentialsContainer>
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
        </CredentialsContainer>
    );
}
