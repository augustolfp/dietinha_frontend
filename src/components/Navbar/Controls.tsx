import { FaGithub } from "react-icons/fa";
import useUser from "../../hooks/authHooks/useUser";
import { signOut } from "@firebase/auth";
import { auth } from "../../config/firebase";

export default function Controls() {
    const { isLoggedIn } = useUser();

    return (
        <div className="flex items-center gap-3 text-pink-700">
            <div>Sobre</div>
            <FaGithub />
            {isLoggedIn && <button onClick={() => signOut(auth)}>Sair</button>}
        </div>
    );
}
