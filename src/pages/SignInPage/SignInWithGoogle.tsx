import { SyntheticEvent } from "react";
import useGoogleAuth from "../../hooks/authHooks/useGoogleAuth";
import GoogleButton from "../../components/GoogleButton";

export default function SignInWithGoogle() {
    const { isLoading, googleAuth } = useGoogleAuth();

    const handleGoogleLogin = async (e: SyntheticEvent) => {
        e.preventDefault();
        await googleAuth();
    };

    return (
        <GoogleButton disabled={isLoading} onClick={handleGoogleLogin}>
            Logar com o Google
        </GoogleButton>
    );
}
