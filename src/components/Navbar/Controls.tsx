import { FaGithub } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks/typedReduxHooks";
import { signOutUser } from "../../store/slices/userSlice";

export default function Controls() {
    const dispatch = useAppDispatch();
    const { accessToken, status } = useAppSelector((state) => state.user.user);

    const handleSignout = () => {
        dispatch(signOutUser());
    };

    return (
        <div className="flex items-center gap-3 text-pink-700">
            <div>Sobre</div>
            <FaGithub />
            {accessToken && (
                <button disabled={status === "loading"} onClick={handleSignout}>
                    Sair
                </button>
            )}
        </div>
    );
}
