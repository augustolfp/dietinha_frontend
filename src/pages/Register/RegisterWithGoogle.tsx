import { SyntheticEvent } from "react";
import { AuthForm } from "../../components/AuthForm";
import { useAppDispatch, useAppSelector } from "../../hooks/typedReduxHooks";
import { googleAuth } from "../../store/slices/userSlice";

export default function RegisterWithGoogle() {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector((state) => state.user.user);

    const handleGoogleRegister = async (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(googleAuth());
    };

    return (
        <AuthForm.GoogleButton
            disabled={status === "loading"}
            onClick={handleGoogleRegister}
        >
            Cadastre-se com o Google
        </AuthForm.GoogleButton>
    );
}
