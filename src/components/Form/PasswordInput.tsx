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
        <div>
            <input
                id="password"
                {...register("password")}
                type={passwordVisible ? "text" : "password"}
                {...props}
            />
            <div onClick={togglePasswordVisibility}>
                {passwordVisible ? <BiSolidHide /> : <BiSolidShow />}
            </div>
        </div>
    );
}
