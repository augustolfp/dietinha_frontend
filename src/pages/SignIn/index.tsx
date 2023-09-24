import { Link } from "react-router-dom";
import SignInWithGoogle from "./SignInWithGoogle";
import SignInForm from "./SignInForm";
import HeroText from "../../components/HeroText";

export default function SignIn() {
    return (
        <div className="container mx-auto">
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <HeroText />
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h2 className="text-center font-bold">Login</h2>
                            <SignInForm />
                            <SignInWithGoogle />
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
