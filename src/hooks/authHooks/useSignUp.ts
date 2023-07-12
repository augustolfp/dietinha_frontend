import { useState } from "react";
import { auth } from "../../config/firebase";
import { setUser } from "../../store";
import { useAppDispatch } from "../typedReduxHooks";
import { createUserWithEmailAndPassword } from "@firebase/auth";

interface SignUpCredentials {
    email: string;
    password: string;
}

export default function useSignUp() {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const signUp = async ({ email, password }: SignUpCredentials) => {
        setIsLoading(true);
        try {
            const { user } = await createUserWithEmailAndPassword(
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
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        signUp,
    };
}
