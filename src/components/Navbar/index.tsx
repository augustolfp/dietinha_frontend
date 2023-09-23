import Controls from "./Controls";

export default function Navbar() {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">Dietinha!</a>
            </div>
            <Controls />
        </div>
    );
}
