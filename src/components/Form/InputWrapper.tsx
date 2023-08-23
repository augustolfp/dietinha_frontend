import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function InputWrapper({ children }: Props) {
    return <div className="flex flex-col gap-1">{children}</div>;
}
