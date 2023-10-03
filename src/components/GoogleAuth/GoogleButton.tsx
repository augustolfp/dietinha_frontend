import { FcGoogle } from "react-icons/fc";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}

export default function GoogleButton({ children, disabled, ...rest }: Props) {
    return (
        <button
            {...rest}
            disabled={disabled}
            className="btn btn-outline w-full"
        >
            {disabled ? (
                "Loading..."
            ) : (
                <div className="flex items-center gap-x-2">
                    <FcGoogle />
                    {children}
                </div>
            )}
        </button>
    );
}
