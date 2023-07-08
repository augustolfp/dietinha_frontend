import useAuthentication from "../hooks/useAuthentication";
import { Navigate } from "react-router-dom";

type Props = {
    children?: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
    const { isLoggedIn } = useAuthentication();
    const logged = isLoggedIn();

    if (logged) {
        return <Navigate to="/dashboard" />;
    }

    return <>{children}</>;
}
