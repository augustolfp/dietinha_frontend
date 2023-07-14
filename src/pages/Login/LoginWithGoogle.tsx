import { FcGoogle } from "react-icons/fc";
import { SyntheticEvent } from "react";
import { Button } from "../../components/Button";
import useGoogleAuth from "../../hooks/authHooks/useGoogleAuth";

export default function LoginWithGoogle() {
    const { isLoading, googleAuth } = useGoogleAuth();

    const handleGoogleLogin = async (e: SyntheticEvent) => {
        e.preventDefault();
        await googleAuth();
    };

    return (
        <button
            className="border border-black text-zinc-700 p-2 flex items-center justify-center"
            disabled={isLoading}
            onClick={handleGoogleLogin}
        >
            <FcGoogle />
            <span>Logar com o Google</span>
        </button>
    );
}
