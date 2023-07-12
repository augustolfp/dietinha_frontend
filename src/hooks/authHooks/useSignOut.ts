import { useState } from "react";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useAppDispatch } from "../typedReduxHooks";
import { clearUserData } from "../../store";

export default function useSignOut() {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const signOut = async () => {
        setIsLoading(true);
        try {
            await firebaseSignOut(auth);
            dispatch(clearUserData());
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        signOut,
    };
}
