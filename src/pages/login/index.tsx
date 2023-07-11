import { BiSolidShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLoading, signInCall, googleSignInCall } = useAuthentication();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        await signInCall({ email, password });
    };

    const handleGoogleLogin = async (e: any) => {
        e.preventDefault();
        await googleSignInCall();
    };

    return (
        <div className="flex flex-col items-center">
            <div className=" bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">Login</div>
                <form onSubmit={handleLogin}>
                    Email:
                    <br />
                    <Input.Root
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                    <br />
                    Password:
                    <br />
                    <Input.Root
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    >
                        <Input.RightActions>
                            <Input.RightAction icon={BiSolidShow} />
                        </Input.RightActions>
                    </Input.Root>
                    <br />
                    <Button.Root
                        className="auth-button"
                        type="submit"
                        disabled={isLoading}
                    >
                        Entrar
                    </Button.Root>
                </form>
                <Button.Root
                    className="auth-button bg-slate-200 text-zinc-700"
                    disabled={isLoading}
                    onClick={handleGoogleLogin}
                >
                    <FcGoogle />
                    <span>Logar com o Google</span>
                </Button.Root>
                <div className="text-pink-600 text-center hover:text-pink-400">
                    <Link to="/register">
                        Ainda não tem uma conta? Cadastre-se!
                    </Link>
                </div>
            </div>
        </div>
    );
}
