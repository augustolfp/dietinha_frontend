import CredentialsContainer from "../../components/PageContainers/CredentialsContainer";
import { Link } from "react-router-dom";
import SignInForm from "./SignInForm";
import HeroText from "../../components/HeroText";
import GoogleAuth from "../../components/GoogleAuth";

export default function SignInPage() {
    return (
        <CredentialsContainer>
            <HeroText />
            <div className="card bg-base-100 shadow-xl p-5 flex flex-col gap-3 items-center w-full">
                <h2 className="font-bold text-2xl">Login</h2>
                <SignInForm />
                <div className="divider text-sm">ou</div>
                <GoogleAuth>Logar com o Google</GoogleAuth>
                <Link to="/sign-up" className="link link-neutral">
                    Ainda não tem uma conta? Cadastre-se!
                </Link>
            </div>
        </CredentialsContainer>
    );
}
