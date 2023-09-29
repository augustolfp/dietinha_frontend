import useUser from "../../hooks/authHooks/useUser";
import { useGetMealsQuery } from "../../store/api/apiSlice";
import { useParams } from "react-router-dom";
import Header from "./Header";
import MealForm from "../../components/MealForm";
import Meal from "../../components/Meal";

export default function DailyLogPage() {
    const { accessToken } = useUser();
    const { dailyLogId } = useParams();
    const { data, error, isLoading } = useGetMealsQuery(
        { id: dailyLogId! },
        { skip: !Boolean(accessToken) }
    );

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (error) {
        content = <p className="text-red-600">Error on fetching</p>;
    } else if (data) {
        content = data.map((meal) => {
            return (
                <div key={meal.id}>
                    <div>Título: {meal.name}</div>
                    <div>Descrição: {meal.description}</div>
                    <div>
                        Sumário da refeição:
                        <Meal mealId={meal.id} />
                    </div>
                </div>
            );
        });
    }

    return (
        <div>
            <div className="container mx-auto flex gap-x-4">
                <div className="card w-96 bg-base-100 shadow-xl p-4">
                    <Header dailyLogId={dailyLogId!} />
                </div>
                <div className="card w-96 bg-base-100 shadow-xl p-4">
                    <h2 className="text-xl font-bold">
                        Adicionar nova refeição:
                    </h2>
                    <MealForm dailyLogId={dailyLogId!} />
                </div>
            </div>
            <div className="container mx-auto bg-base-100 shadow-xl p-4">
                <h2 className="text-xl font-bold mb-8">Lista de refeições:</h2>
                {content}
            </div>
        </div>
    );
}
