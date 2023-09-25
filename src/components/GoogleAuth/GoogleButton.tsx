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
            className="py-2 rounded border-solid border-2 border-black flex justify-center disabled:bg-slate-300"
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
