import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/typedReduxHooks";

type Props = {
    children?: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
    const { accessToken, status } = useAppSelector((state) => state.user.user);

    if (accessToken) {
        return <Navigate to="/dashboard" />;
    }

    return <>{children}</>;
}
