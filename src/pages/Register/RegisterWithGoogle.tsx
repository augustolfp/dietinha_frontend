import { FcGoogle } from "react-icons/fc";
import { SyntheticEvent } from "react";
import { Button } from "../../components/Button";
import useGoogleAuth from "../../hooks/authHooks/useGoogleAuth";

export default function RegisterWithGoogle() {
    const { isLoading, googleAuth } = useGoogleAuth();

    const handleGoogleRegister = async (e: SyntheticEvent) => {
        e.preventDefault();
        await googleAuth();
    };

    return (
        <Button.Root
            className="auth-button bg-slate-200 text-zinc-700"
            disabled={isLoading}
            onClick={handleGoogleRegister}
        >
            <FcGoogle />
            <span>Cadastre-se com o Google</span>
        </Button.Root>
    );
}
