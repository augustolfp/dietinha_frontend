interface Props {
    onClose: React.MouseEventHandler;
    children?: React.ReactNode;
}

export default function Drawer({ children, onClose }: Props) {
    return (
        <div className="fixed top-[64px] h-[calc(100vh-64px)] left-0 flex w-full z-30">
            <div className="w-10/12 h-full bg-base-200 flex flex-col justify-between px-3 py-2">
                {children}
            </div>
            <div
                onClick={onClose}
                className="w-1/6 h-full bg-black opacity-50"
            ></div>
        </div>
    );
}
