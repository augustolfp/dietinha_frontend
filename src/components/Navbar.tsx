import { IconType } from "react-icons";
import { FaGithub } from "react-icons/fa";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center absolute top-0 w-screen bg-white shadow-md p-4">
            <h1>DIETINHA!</h1>
            <div className="flex">
                <div className="navbar-icon m-4">Sobre</div>
                <NavbarIcon icon={FaGithub} />
            </div>
        </div>
    );
}

const NavbarIcon = ({ icon: Icon }: { icon: IconType }) => (
    <div className="navbar-icon">
        <Icon />
    </div>
);
