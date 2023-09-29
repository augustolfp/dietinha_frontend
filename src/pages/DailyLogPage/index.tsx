import { useParams } from "react-router-dom";
import MealForm from "../../components/MealForm";
import DailyLog from "../../components/DailyLog";

import MealsList from "../../components/MealsList";

export default function DailyLogPage() {
    const { dailyLogId } = useParams();
    return (
        <div className="container mx-auto p-6">
            <div className="lg:flex lg:justify-between">
                <h2 className="lg:text-3xl font-bold mb-6">Dia da Semana</h2>
                <p className="lg:text-3xl font-bold mb-6">Data</p>
            </div>
            <DailyLog dailyLogId={dailyLogId!} />
            <h2 className="text-xl font-bold">Adicionar nova refeição:</h2>
            <MealForm dailyLogId={dailyLogId!} />
            <h2 className="text-xl font-bold">Refeições:</h2>
            <MealsList dailyLogId={dailyLogId!} />
        </div>
    );
}
