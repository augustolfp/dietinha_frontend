import { FaGithub } from "react-icons/fa";
import useSignOut from "../../hooks/authHooks/useSignOut";
import useUser from "../../hooks/authHooks/useUser";

export default function Controls() {
    const { isLoggedIn } = useUser();
    const { isLoading, signOut } = useSignOut();

    const handleSignout = async () => {
        await signOut();
    };

    return (
        <div className="flex items-center gap-3 text-pink-700">
            <div>Sobre</div>
            <FaGithub />
            {isLoggedIn && (
                <button disabled={isLoading} onClick={handleSignout}>
                    Sair
                </button>
            )}
        </div>
    );
}
