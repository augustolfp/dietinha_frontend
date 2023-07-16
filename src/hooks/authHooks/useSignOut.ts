import { useSignOut as firebaseSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

export default function useSignOut() {
    const [signOut, loading, error] = firebaseSignOut(auth);

    return {
        isLoading: loading,
        signOut,
    };
}
