import Controls from "./Controls";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Link } from "react-router-dom";

export default function Navbar() {
    const isDesktop = useMediaQuery("(min-width: 600px)");
    return (
        <div className="navbar bg-base-100 drop-shadow-md">
            <div className="flex-1">
                <Link
                    to="/"
                    className="btn btn-ghost normal-case text-4xl flex gap-0"
                >
                    <span className="text-primary">D</span>
                    {isDesktop && <span className="text-primary">ietinha</span>}
                    <span className="text-secondary">!</span>
                </Link>
                <button></button>
            </div>
            <Controls />
        </div>
    );
}
