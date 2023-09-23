import { FaGithub } from "react-icons/fa";
import useUser from "../../hooks/authHooks/useUser";
import useSignOut from "../../hooks/authHooks/useSignOut";

export default function Controls() {
    const { isLoggedIn } = useUser();

    return (
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
                <li>
                    <a>Sobre</a>
                </li>
                <li>
                    <a>Github</a>
                </li>
                {isLoggedIn && (
                    <li>
                        <button onClick={() => useSignOut()}>Sair</button>
                    </li>
                )}
            </ul>
        </div>
    );
}
