import { FcGoogle } from "react-icons/fc";
import { DotWave } from "@uiball/loaders";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}

export default function GoogleButton({ children, disabled, ...rest }: Props) {
    return (
        <button
            {...rest}
            className="py-2 rounded border-solid border-2 border-black flex justify-center"
        >
            {disabled ? (
                <DotWave />
            ) : (
                <div className="flex items-center gap-x-2">
                    <FcGoogle />
                    {children}
                </div>
            )}
        </button>
    );
}
