import { useParams } from "react-router-dom";
import Header from "./Header";
import MealForm from "../../components/MealForm";

export default function DailyLogPage() {
    const { dailyLogId } = useParams();

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
                {/* <ul className="p-8">
                    {data.mealsList.map((meal) => (
                        <li key={meal.id}>
                            <Meal {...meal} />
                        </li>
                    ))}
                </ul> */}
            </div>
        </div>
    );
}
