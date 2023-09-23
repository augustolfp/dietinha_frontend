import { ButtonHTMLAttributes, ReactNode } from "react";
import { DotWave } from "@uiball/loaders";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export default function SubmitButton({ disabled, children, ...rest }: Props) {
    return (
        <button type="submit" {...rest}>
            {disabled ? <DotWave /> : children}
        </button>
    );
}
