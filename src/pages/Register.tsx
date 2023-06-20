import { useState } from "react";
import useAuthentication from "../hooks/useAuthentication";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLoading, signUpCall } = useAuthentication();

    const handleRegister = async (e: any) => {
        e.preventDefault();
        await signUpCall({ email, password });
    };

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
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
                    {isLoading ? "loading..." : "Register"}
                </button>
            </form>
        </>
    );
}
