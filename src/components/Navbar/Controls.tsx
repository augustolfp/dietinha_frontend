import { FaGithub } from "react-icons/fa";
import useSignOut from "../../hooks/authHooks/useSignOut";
import useIsLoggedIn from "../../hooks/authHooks/useIsLoggedIn";

export default function Controls() {
    const { isLoggedIn } = useIsLoggedIn();
    const { isLoading, signOut } = useSignOut();
    const logged = isLoggedIn();

    const handleSignout = async () => {
        await signOut();
    };

    return (
        <div className="flex items-center gap-3 text-pink-700">
            <div>Sobre</div>
            <FaGithub />
            {logged && (
                <button disabled={isLoading} onClick={handleSignout}>
                    Sair
                </button>
            )}
        </div>
    );
}
