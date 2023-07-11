import { twMerge } from "tailwind-merge";
import { InputHTMLAttributes, ReactNode } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    children?: ReactNode;
}

export default function InputRoot({ children, ...rest }: Props) {
    return (
        <div className="relative flex items-center">
            <input
                {...rest}
                className={twMerge(
                    "absolute w-full border-gray-300 rounded-lg shadow-sm focus:border-pink-500",
                    rest.className
                )}
            />
            <div className="absolute right-1">{children}</div>
        </div>
    );
}
