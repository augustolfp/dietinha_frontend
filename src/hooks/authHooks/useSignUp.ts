import { useState } from "react";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";

interface SignUpCredentials {
    displayName: string;
    email: string;
    password: string;
}

export default function useSignUp() {
    const [isLoading, setIsLoading] = useState(false);

    const signUp = async ({
        displayName,
        email,
        password,
    }: SignUpCredentials) => {
        setIsLoading(true);
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(user, {
                displayName: displayName,
            });
        } catch (err) {
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        signUp,
    };
}
