import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

export default function useUser() {
    const [user, loading, error] = useAuthState(auth);
    const logged = () => {
        if (user) {
            return true;
        }
        return false;
    };

    const isLoggedIn = logged();

    return {
        isLoggedIn,
        user,
    };
}
