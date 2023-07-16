import useUser from "../hooks/authHooks/useUser";

export default function Dashboard() {
    const { user } = useUser();

    return (
        <div className="flex flex-col items-center">
            <h2>Bem vindo a Dashboard!</h2>
            <h3>Usuário logado:</h3>
            <pre className="text-blue-700">
                <p className="w-[300px]">{JSON.stringify(user, null, "\t")}</p>
            </pre>
        </div>
    );
}
