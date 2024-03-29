import Controls from "./Controls";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Link } from "react-router-dom";

export default function Navbar() {
    const isDesktop = useMediaQuery("(min-width: 600px)");
    return (
        <div className="navbar bg-white drop-shadow-md sticky top-0 z-30 h-16">
            <div className="flex-1">
                <Link
                    to="/"
                    className="btn btn-ghost normal-case text-4xl flex gap-0"
                >
                    <span className="text-base-content">D</span>
                    {isDesktop && (
                        <span className="text-base-content">ietinha</span>
                    )}
                    <span className="text-green-500">!</span>
                </Link>
                <button></button>
            </div>
            <Controls />
        </div>
    );
}
