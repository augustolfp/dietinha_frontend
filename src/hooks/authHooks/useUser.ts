import { useState } from "react";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

export default function useUser() {
    const [accessToken, setAccessToken] = useState("");
    const [user, loading, error] = useIdToken(auth);

    const logged = () => {
        if (user) {
            return true;
        }
        return false;
    };

    const isLoggedIn = logged();

    if (user) {
        const getToken = user.getIdToken();
        getToken.then((token) => {
            setAccessToken(token);
        });
    }

    return {
        isLoggedIn,
        user,
        accessToken,
    };
}
