import { SyntheticEvent } from "react";
import useGoogleAuth from "../../hooks/authHooks/useGoogleAuth";
import GoogleButton from "../../components/GoogleButton";

export default function SignUpWithGoogle() {
    const { isLoading, googleAuth } = useGoogleAuth();

    const handleGoogleRegister = async (e: SyntheticEvent) => {
        e.preventDefault();
        await googleAuth();
    };

    return (
        <GoogleButton disabled={isLoading} onClick={handleGoogleRegister}>
            Cadastre-se com o Google
        </GoogleButton>
    );
}
