import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes, ElementType } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ElementType;
}

export default function InputRightAction({ icon: Icon, ...rest }: Props) {
    return (
        <button {...rest} className={twMerge("", rest.className)}>
            <Icon />
        </button>
    );
}
