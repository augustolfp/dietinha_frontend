import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";

interface SignUpCredentials {
    displayName: string;
    email: string;
    password: string;
}

export default function useSignUp() {
    const signUp = async ({
        displayName,
        email,
        password,
    }: SignUpCredentials) => {
        const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await updateProfile(user, {
            displayName: displayName,
        });
    };

    return {
        signUp,
    };

    // const signUp = async ({
    //     displayName,
    //     email,
    //     password,
    // }: SignUpCredentials) => {
    //     setIsLoading(true);
    //     try {
    //         const { user } = await createUserWithEmailAndPassword(
    //             auth,
    //             email,
    //             password
    //         );

    //         await updateProfile(user, {
    //             displayName: displayName,
    //         });
    //     } catch (err) {
    //         throw err;
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // return {
    //     isLoading,
    //     signUp,
    // };
}
