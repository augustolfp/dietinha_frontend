import useUser from "../../hooks/authHooks/useUser";
import { useGetDailyLogByIdQuery } from "../../store/api/apiSlice";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Meal from "../../components/Meal";
import MealForm from "../../components/MealForm";

export default function DailyLogPage() {
    const { dailyLogId } = useParams();
    const { accessToken } = useUser();

    const { data, isFetching, isSuccess } = useGetDailyLogByIdQuery(
        dailyLogId!,
        {
            skip: !Boolean(accessToken),
        }
    );

    let content;
    if (isFetching) {
        content = <div>Loading....</div>;
    } else if (isSuccess) {
        content = (
            <>
                <div className="container mx-auto flex gap-x-4">
                    <div className="card w-96 bg-base-100 shadow-xl p-4">
                        <Header
                            id={data.id}
                            userId={data.userId}
                            date={data.date}
                            notes={data.notes}
                            caloriesTarget={data.caloriesTarget}
                            proteinsTarget={data.proteinsTarget}
                            carbs={data.carbs}
                            fats={data.fats}
                            proteins={data.proteins}
                            kcals={data.kcals}
                        />
                    </div>
                    <div className="card w-96 bg-base-100 shadow-xl p-4">
                        <h2 className="text-xl font-bold">
                            Adicionar nova refeição:
                        </h2>
                        <MealForm dailyLogId={dailyLogId!} />
                    </div>
                </div>
                <div className="container mx-auto bg-base-100 shadow-xl p-4">
                    <h2 className="text-xl font-bold mb-8">
                        Lista de refeições:
                    </h2>
                    <ul className="p-8">
                        {data.mealsList.map((meal) => (
                            <li>
                                <Meal {...meal} />
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        );
    }

    return <div>{content}</div>;
}
