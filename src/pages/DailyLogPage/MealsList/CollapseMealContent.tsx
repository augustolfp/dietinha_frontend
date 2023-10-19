interface Props {
    children?: React.ReactNode;
}

export default function CollapseMealContent({ children }: Props) {
    return (
        <div className="collapse-content">
            <div className="h-72">
                <div className="md:flex md:justify-between">{children}</div>
            </div>
        </div>
    );
}
