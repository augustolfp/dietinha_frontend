import { SyntheticEvent } from "react";
import useGoogleAuth from "../../hooks/authHooks/useGoogleAuth";
import { AuthForm } from "../../components/AuthForm";

export default function RegisterWithGoogle() {
    const { isLoading, googleAuth } = useGoogleAuth();

    const handleGoogleRegister = async (e: SyntheticEvent) => {
        e.preventDefault();
        await googleAuth();
    };

    return (
        <AuthForm.GoogleButton
            disabled={isLoading}
            onClick={handleGoogleRegister}
        >
            Cadastre-se com o Google
        </AuthForm.GoogleButton>
    );
}
