import { useState } from "react";
import { auth } from "../../config/firebase";
import { setUser } from "../../store";
import { useAppDispatch } from "../typedReduxHooks";
import { signInWithEmailAndPassword } from "@firebase/auth";

interface SignInCredentials {
    email: string;
    password: string;
}

export default function useSignIn() {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const signIn = async ({ email, password }: SignInCredentials) => {
        setIsLoading(true);
        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            dispatch(
                setUser({
                    email: user.email,
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                })
            );
        } catch (err) {
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        signIn,
    };
}
