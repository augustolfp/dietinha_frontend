import { useState } from "react";
import useAuthentication from "../../hooks/useAuthentication";

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
                        {isLoading ? "loading..." : "Log In"}
                    </button>
                </form>
                <button
                    className="auth-button"
                    disabled={isLoading}
                    onClick={handleGoogleLogin}
                >
                    Sign in with google!
                </button>
            </div>
        </div>
    );
}
