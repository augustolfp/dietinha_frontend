import { useState, SyntheticEvent } from "react";
import { DotWave } from "@uiball/loaders";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import useSignIn from "../../hooks/authHooks/useSignIn";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLoading, signIn } = useSignIn();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleLogin = async (e: SyntheticEvent) => {
        e.preventDefault();
        await signIn({ email, password });
    };

    const togglePasswordVisibility = (e: SyntheticEvent) => {
        e.preventDefault();
        setPasswordVisible(!passwordVisible);
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
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
            >
                <Input.RightActions>
                    <Input.RightAction
                        onClick={togglePasswordVisibility}
                        icon={passwordVisible ? BiSolidHide : BiSolidShow}
                    />
                </Input.RightActions>
            </Input.Root>
            <br />
            <Button.Root type="submit" disabled={isLoading}>
                {isLoading ? <DotWave /> : "Entrar"}
            </Button.Root>
        </form>
    );
}
