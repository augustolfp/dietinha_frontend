import useUser from "../hooks/authHooks/useUser";
import { useFetchCountedDaysQuery } from "../store";

export default function Dashboard() {
    const { accessToken } = useUser();
    const { data, error, isLoading } = useFetchCountedDaysQuery(accessToken);

    return (
        <div className="flex flex-col items-center">
            <h2>Bem vindo a Dashboard!</h2>
            {/* <h3>Usuário logado:</h3>
            <pre className="text-blue-700">
                <p className="w-[300px]">{JSON.stringify(user, null, "\t")}</p>
            </pre> */}
            <pre className="text-blue-700">
                {!isLoading && (
                    <p className="w-[300px]">
                        {JSON.stringify(data, null, "\t")}
                    </p>
                )}
            </pre>
        </div>
    );
}
