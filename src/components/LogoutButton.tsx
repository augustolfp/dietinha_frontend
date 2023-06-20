import useAuthentication from "../hooks/useAuthentication";

export default function LogoutButton() {
    const { isLoading, signOutCall } = useAuthentication();

    const handleSignout = async () => {
        await signOutCall();
    };

    return (
        <button disabled={isLoading} onClick={handleSignout}>
            {isLoading ? "loading..." : "Signout"}
        </button>
    );
}
