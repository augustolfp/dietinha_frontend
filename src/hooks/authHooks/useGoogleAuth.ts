import { useState } from "react";
import { auth } from "../../config/firebase";
import { setUser } from "../../store";
import { useAppDispatch } from "../typedReduxHooks";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";

const googleProvider = new GoogleAuthProvider();

export default function useGoogleAuth() {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const googleAuth = async () => {
        setIsLoading(true);
        try {
            const { user } = await signInWithPopup(auth, googleProvider);

            dispatch(
                setUser({
                    email: user.email,
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                })
            );
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        googleAuth,
    };
}
