import { SyntheticEvent } from "react";
import GoogleButton from "./GoogleButton";
import useGoogleAuth from "../../hooks/authHooks/useGoogleAuth";

interface Props {
    children?: React.ReactNode;
}

export default function GoogleAuth({ children }: Props) {
    const { isLoading, googleAuth, error } = useGoogleAuth();

    const handleGoogleAuth = async (e: SyntheticEvent) => {
        e.preventDefault();
        await googleAuth();
    };

    return (
        <>
            <GoogleButton disabled={isLoading} onClick={handleGoogleAuth}>
                {children}
            </GoogleButton>
            {error?.message && <p className="text-red-500">{error.message}</p>}
        </>
    );
}
