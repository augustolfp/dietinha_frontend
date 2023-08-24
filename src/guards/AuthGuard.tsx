import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/authHooks/useUser";

export default function AuthGuard() {
    const { isLoggedIn } = useUser();

    return <>{isLoggedIn ? <Outlet /> : <Navigate to="/" replace />}</>;
}
