import { useState, SyntheticEvent } from "react";
import { BiSolidShow } from "react-icons/bi";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import useSignIn from "../../hooks/authHooks/useSignIn";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLoading, signIn } = useSignIn();

    const handleLogin = async (e: SyntheticEvent) => {
        e.preventDefault();
        await signIn({ email, password });
    };
    return (
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
            <Button.Root type="submit" disabled={isLoading}>
                Entrar
            </Button.Root>
        </form>
    );
}
