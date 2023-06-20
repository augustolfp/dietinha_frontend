import { useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        console.log("Register routine triggered!");
    };

    return (
        <div>
            <h1>Register</h1>
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
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}
