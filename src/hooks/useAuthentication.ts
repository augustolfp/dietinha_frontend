import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./typedReduxHooks";
import { createUserWithEmailAndPassword, signOut } from "@firebase/auth";
import { setUser } from "../store";
import { auth } from "../config/firebase";

interface SignUpCredentials {
    email: string;
    password: string;
}

export default function useAuthentication() {
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const isLoggedIn = () => {
        const user = useAppSelector((state) => {
            return state.user;
        });

        if (user.user.email) {
            return true;
        }
        return false;
    };

    const signUpCall = async ({ email, password }: SignUpCredentials) => {
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
        isLoggedIn,
        signUpCall,
    };
}
