interface Props {
    children?: React.ReactNode;
}

export default function CollapseMealContent({ children }: Props) {
    return (
        <div className="collapse-content">
            <div className="h-72 flex flex-col gap-4 md:flex-row md:justify-between my-4">
                {children}
            </div>
        </div>
    );
}
