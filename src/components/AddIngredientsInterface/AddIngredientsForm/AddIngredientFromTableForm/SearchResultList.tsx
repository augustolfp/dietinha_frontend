interface Props {
    visible: boolean;
    children?: React.ReactNode;
}

export default function SearchResultList({ visible, children }: Props) {
    if (visible) {
        return <div className="p-4 rounded-xl bg-pink-300">{children}</div>;
    }
    return <></>;
}
