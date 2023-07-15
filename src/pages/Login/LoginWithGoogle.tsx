import { SyntheticEvent } from "react";
import useGoogleAuth from "../../hooks/authHooks/useGoogleAuth";
import { AuthForm } from "../../components/AuthForm";

export default function LoginWithGoogle() {
    const { isLoading, googleAuth } = useGoogleAuth();

    const handleGoogleLogin = async (e: SyntheticEvent) => {
        e.preventDefault();
        await googleAuth();
    };

    return (
        <AuthForm.GoogleButton disabled={isLoading} onClick={handleGoogleLogin}>
            Logar com o Google
        </AuthForm.GoogleButton>
    );
}
