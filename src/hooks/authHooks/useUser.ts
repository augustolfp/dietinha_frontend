import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

export default function useUser() {
    const [accessToken, setAccessToken] = useState("");
    const [user] = useAuthState(auth);

    const logged = () => {
        if (user) {
            return true;
        }
        return false;
    };

    const isLoggedIn = logged();

    useEffect(() => {
        if (user) {
            const getToken = user.getIdToken();
            getToken.then((token) => {
                setAccessToken(token);
            });
        }
    }, [user]);

    return {
        isLoggedIn,
        user,
        accessToken,
    };
}
