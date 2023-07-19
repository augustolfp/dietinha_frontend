import { SyntheticEvent } from "react";
import { AuthForm } from "../../components/AuthForm";
import { useAppDispatch, useAppSelector } from "../../hooks/typedReduxHooks";
import { googleAuth } from "../../store/slices/userSlice";

export default function LoginWithGoogle() {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector((state) => state.user.user);

    const handleGoogleLogin = async (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(googleAuth());
    };

    return (
        <AuthForm.GoogleButton
            disabled={status === "loading"}
            onClick={handleGoogleLogin}
        >
            Logar com o Google
        </AuthForm.GoogleButton>
    );
}
