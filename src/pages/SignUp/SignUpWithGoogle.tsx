import { SyntheticEvent } from "react";
import useGoogleAuth from "../../hooks/authHooks/useGoogleAuth";
import { Form } from "../../components/Form";

export default function SignUpWithGoogle() {
    const { isLoading, googleAuth } = useGoogleAuth();

    const handleGoogleRegister = async (e: SyntheticEvent) => {
        e.preventDefault();
        await googleAuth();
    };

    return (
        <Form.GoogleButton disabled={isLoading} onClick={handleGoogleRegister}>
            Cadastre-se com o Google
        </Form.GoogleButton>
    );
}
