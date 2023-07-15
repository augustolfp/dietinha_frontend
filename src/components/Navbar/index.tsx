import Controls from "./Controls";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center absolute top-0 w-screen bg-white shadow-md px-4 py-2">
            <h1 className="font-bold text-pink-700">DIETINHA!</h1>
            <Controls />
        </div>
    );
}
