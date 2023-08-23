import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

export default function Input(props: Props) {
    const { register } = useFormContext();

    return <input id={props.name} {...register(props.name)} {...props} />;
}
