import { useState } from "react";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";

interface SignInCredentials {
    email: string;
    password: string;
}

export default function useSignIn() {
    const [isLoading, setIsLoading] = useState(false);

    const signIn = async ({ email, password }: SignInCredentials) => {
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
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
