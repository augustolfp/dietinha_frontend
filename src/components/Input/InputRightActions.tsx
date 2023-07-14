import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function InputRightActions({ children }: Props) {
    return <div>{children}</div>;
}
