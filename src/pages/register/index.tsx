import { useState } from "react";
import useAuthentication from "../../hooks/useAuthentication";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLoading, signUpCall } = useAuthentication();

    const handleRegister = async (e: any) => {
        e.preventDefault();
        await signUpCall({ email, password });
    };

    return (
        <div className="flex flex-col items-center">
            <div className=" bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">Cadastro</div>
                <form onSubmit={handleRegister}>
                    Email:
                    <br />
                    <input
                        className="auth-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                    <br />
                    Password:
                    <br />
                    <input
                        className="auth-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                    <br />
                    <button
                        className="auth-button"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "loading..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}
