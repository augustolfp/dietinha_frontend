interface Props {
    onClose: React.MouseEventHandler;
    children?: React.ReactNode;
}

export default function Drawer({ children, onClose: onClick }: Props) {
    return (
        <div className="fixed top-[64px] h-[calc(100vh-64px)] left-0 flex w-full z-10">
            <div className="w-10/12 h-full bg-base-200 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between">
                        <h2>Adicionar Ingrediente</h2>
                        <button className="btn btn-ghost" onClick={onClick}>
                            x
                        </button>
                    </div>
                    {children}
                </div>
            </div>
            <div
                onClick={onClick}
                className="w-1/6 h-full bg-black opacity-50"
            ></div>
        </div>
    );
}
