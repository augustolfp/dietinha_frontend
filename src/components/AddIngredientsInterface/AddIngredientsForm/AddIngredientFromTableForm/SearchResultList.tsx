interface Props {
    children?: React.ReactNode;
}

export default function SearchResultList({ children }: Props) {
    return <div className="bg-base-100 p-4 rounded-xl">{children}</div>;
}
