import { useFormContext } from "react-hook-form";
import { useState, InputHTMLAttributes, SyntheticEvent } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function PasswordInput(props: Props) {
    const { register } = useFormContext();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = (e: SyntheticEvent) => {
        e.preventDefault();
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="flex items-center relative">
            <input
                id="password"
                {...register("password")}
                className="w-full"
                type={passwordVisible ? "text" : "password"}
                {...props}
            />
            <div
                className="absolute right-2"
                onClick={togglePasswordVisibility}
            >
                {passwordVisible ? <BiSolidHide /> : <BiSolidShow />}
            </div>
        </div>
    );
}
