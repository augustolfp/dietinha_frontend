import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

export default function useGoogleAuth() {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    return {
        isLoading: loading,
        googleAuth: signInWithGoogle,
        error,
    };
}
