interface Props {
    visible: boolean;
    children?: React.ReactNode;
}

export default function SearchResultList({ visible, children }: Props) {
    if (visible) {
        return <div className="bg-base-100 p-4 rounded-xl">{children}</div>;
    }
    return <></>;
}
