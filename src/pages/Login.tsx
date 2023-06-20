import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log("Login routine triggered!");
    };

    return (
        <div>
            <h1>Login</h1>
            Email:
            <br />
            <input
                type="text"
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
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
}
