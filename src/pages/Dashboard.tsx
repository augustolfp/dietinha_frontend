import { useFetchCountedDaysQuery } from "../store";
import { useAppSelector } from "../hooks/typedReduxHooks";

export default function Dashboard() {
    const { accessToken } = useAppSelector((state) => state.user.user);
    const { data, error, isFetching } = useFetchCountedDaysQuery(accessToken!);
    return (
        <div className="flex flex-col items-center">
            <h2>Bem vindo a Dashboard!</h2>
            <div>{JSON.stringify(data)}</div>
        </div>
    );
}
