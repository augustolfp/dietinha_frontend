import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type Props = {
    children?: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
    const user = useSelector((state: any) => {
        return state.user;
    });

    if (!user.user.email) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}
