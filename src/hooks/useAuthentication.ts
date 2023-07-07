import { useState } from "react";
import { useAppDispatch } from "./typedReduxHooks";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "@firebase/auth";
import { clearUserData, setUser } from "../store";
import { auth } from "../config/firebase";

interface SignInCredentials {
    email: string;
    password: string;
}

interface SignUpCredentials {
    email: string;
    password: string;
}

export default function useAuthentication() {
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const signInCall = async ({ email, password }: SignInCredentials) => {
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
            console.log(err);
        } finally {
            setIsLoading(false);
        }
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

    const signOutCall = async () => {
        setIsLoading(true);
        try {
            await signOut(auth);
            dispatch(clearUserData());
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, signInCall, signUpCall, signOutCall };
}
