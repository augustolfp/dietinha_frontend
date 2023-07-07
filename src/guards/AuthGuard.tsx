import { useAppSelector } from "../hooks/typedReduxHooks";
import { Navigate } from "react-router-dom";

type Props = {
    children?: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
    const user = useAppSelector((state) => {
        return state.user;
    });

    if (!user.user.email) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}
