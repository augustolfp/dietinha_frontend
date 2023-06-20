import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type Props = {
    children: any;
};

export default function GuestGuard({ children }: Props) {
    const user = useSelector((state: any) => {
        return state.user;
    });

    if (user.user.email) {
        return <Navigate to="/dashboard" />;
    }

    return <>{children}</>;
}
