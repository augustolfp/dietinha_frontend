import { signOut } from "@firebase/auth";
import { auth } from "../../config/firebase";

export default function useSignOut() {
    return signOut(auth);
}
