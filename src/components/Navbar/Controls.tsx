import { FaGithub } from "react-icons/fa";
import useUser from "../../hooks/authHooks/useUser";
import useSignOut from "../../hooks/authHooks/useSignOut";

export default function Controls() {
    const { isLoggedIn } = useUser();

    return (
        <div>
            <div>Sobre</div>
            <FaGithub />
            {isLoggedIn && <button onClick={() => useSignOut()}>Sair</button>}
        </div>
    );
}
