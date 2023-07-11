import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export default function ButtonRoot({ children, ...rest }: Props) {
    return (
        <button
            {...rest}
            className={twMerge(
                "flex justify-center items-center",
                rest.className
            )}
        >
            {children}
        </button>
    );
}
