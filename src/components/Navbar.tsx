import { IconType } from "react-icons";
import { FaGithub } from "react-icons/fa";
import useAuthentication from "../hooks/useAuthentication";

export default function Navbar() {
    const { isLoggedIn, isLoading, signOutCall } = useAuthentication();
    const logged = isLoggedIn();

    const handleSignout = async () => {
        await signOutCall();
    };

    return (
        <div className="flex justify-between items-center absolute top-0 w-screen bg-white shadow-md p-4">
            <h1>DIETINHA!</h1>
            <div className="flex">
                <div className="navbar-icon m-4">Sobre</div>
                <NavbarIcon icon={FaGithub} />
                {logged && (
                    <button disabled={isLoading} onClick={handleSignout}>
                        Sair
                    </button>
                )}
            </div>
        </div>
    );
}

const NavbarIcon = ({ icon: Icon }: { icon: IconType }) => (
    <div className="navbar-icon">
        <Icon />
    </div>
);
