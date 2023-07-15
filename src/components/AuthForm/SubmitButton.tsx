import { ButtonHTMLAttributes, ReactNode } from "react";
import { DotWave } from "@uiball/loaders";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export default function SubmitButton({ disabled, children, ...rest }: Props) {
    return (
        <button
            type="submit"
            className="p-2 bg-pink-500 flex items-center justify-center"
            {...rest}
        >
            {disabled ? <DotWave /> : <>{children}</>}
        </button>
    );
}
