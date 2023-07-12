import { Navigate } from "react-router-dom";
import useIsLoggedIn from "../hooks/authHooks/useIsLoggedIn";

type Props = {
    children?: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
    const { isLoggedIn } = useIsLoggedIn();
    const logged = isLoggedIn();

    if (!logged) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}
