import { useState, SyntheticEvent } from "react";
import { BiSolidShow } from "react-icons/bi";
import useSignUp from "../../hooks/authHooks/useSignUp";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLoading, signUp } = useSignUp();

    const handleRegister = async (e: SyntheticEvent) => {
        e.preventDefault();
        await signUp({ email, password });
    };

    return (
        <form onSubmit={handleRegister}>
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
            <Button.Root type="submit" disabled={isLoading}>
                Entrar
            </Button.Root>
        </form>
    );
}
