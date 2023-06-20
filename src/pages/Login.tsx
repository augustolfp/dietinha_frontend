import { useState } from "react";
import useAuthentication from "../hooks/useAuthentication";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLoading, signInCall } = useAuthentication();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        await signInCall({ email, password });
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                Email:
                <br />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
                <br />
                Password:
                <br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                />
                <br />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "loading..." : "Log In"}
                </button>
            </form>
        </>
    );
}
