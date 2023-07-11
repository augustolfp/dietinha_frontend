import { FcGoogle } from "react-icons/fc";
import { SyntheticEvent } from "react";
import { Button } from "../../components/Button";
import useAuthentication from "../../hooks/useAuthentication";

export default function LoginWithGoogle() {
    const { isLoading, googleSignInCall } = useAuthentication();

    const handleGoogleLogin = async (e: SyntheticEvent) => {
        e.preventDefault();
        await googleSignInCall();
    };

    return (
        <Button.Root
            className="auth-button bg-slate-200 text-zinc-700"
            disabled={isLoading}
            onClick={handleGoogleLogin}
        >
            <FcGoogle />
            <span>Logar com o Google</span>
        </Button.Root>
    );
}
