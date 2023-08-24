import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/authHooks/useUser";

export default function GuestGuard() {
    const { isLoggedIn } = useUser();

    return (
        <>{isLoggedIn ? <Navigate to="/dashboard" replace /> : <Outlet />}</>
    );
}
