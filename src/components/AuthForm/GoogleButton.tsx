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
            className="border border-black text-zinc-700 p-2 flex items-center justify-center gap-2"
        >
            {disabled ? (
                <DotWave />
            ) : (
                <>
                    <FcGoogle />
                    {children}
                </>
            )}
        </button>
    );
}
