import { twMerge } from "tailwind-merge";
import { InputHTMLAttributes, ReactNode } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    children?: ReactNode;
}

export default function InputRoot({ children, ...rest }: Props) {
    return (
        <div>
            <input {...rest} />
            <div>{children}</div>
        </div>
    );
}
