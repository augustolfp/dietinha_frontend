import { useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e: any) => {
        e.preventDefault();
        console.log("Register routine triggered!");
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
                />
                <br />
                Password:
                <br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Register</button>
            </form>
        </>
    );
}
