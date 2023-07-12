import { useAppSelector } from "../typedReduxHooks";

export default function useIsLoggedIn() {
    const isLoggedIn = () => {
        const user = useAppSelector((state) => {
            return state.user;
        });

        if (user.user.email) {
            return true;
        }
        return false;
    };

    return {
        isLoggedIn,
    };
}
