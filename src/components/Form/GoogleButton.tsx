import { FcGoogle } from "react-icons/fc";
import { DotWave } from "@uiball/loaders";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}

export default function GoogleButton({ children, disabled, ...rest }: Props) {
    return (
        <button {...rest}>
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
