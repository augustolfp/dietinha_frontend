import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";

interface SignInCredentials {
    email: string;
    password: string;
}

export default function useSignIn() {
    const signIn = ({ email, password }: SignInCredentials) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    return {
        signIn,
    };
}
