import { AiFillCloseCircle } from "react-icons/ai";

interface Props {
    onClose: React.MouseEventHandler;
}

export default function Header({ onClose: onClick }: Props) {
    return (
        <div className="flex justify-between items-center">
            <h2 className="text-base-content text-lg font-semibold">
                Adicionar Ingrediente
            </h2>
            <button className="btn btn-ghost p-0" onClick={onClick}>
                <AiFillCloseCircle size={24} />
            </button>
        </div>
    );
}
