import { Navigate } from "react-router-dom";
import useUser from "../hooks/authHooks/useUser";

type Props = {
    children?: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
    const { isLoggedIn } = useUser();

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}
