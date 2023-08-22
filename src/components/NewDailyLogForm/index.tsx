import { useState } from "react";
import { useAddDailyLogMutation } from "../../store/api/apiSlice";

export default function NewDailyLogForm() {
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");
    const [caloriesTarget, setCaloriesTarget] = useState(2000);
    const [proteinsTarget, setProteinsTarget] = useState(120);

    const [addDailyLog, { isLoading }] = useAddDailyLogMutation();

    const onAddDailyLogClicked = async (e: React.FormEvent) => {
        e.preventDefault();

        await addDailyLog({
            date,
            notes,
            caloriesTarget,
            proteinsTarget,
        });
    };

    return (
        <div className="bg-purple-200 p-4">
            <h2 className="font-semibold text-lg">New Daily Log</h2>
            <form onSubmit={onAddDailyLogClicked} className="flex flex-col">
                <label htmlFor="date" className="font-semibold text-sm">
                    Date (yyyy-MM-dd format)
                </label>
                <input
                    name="date"
                    type="text"
                    disabled={isLoading}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mb-4"
                />
                <label htmlFor="notes" className="font-semibold text-sm">
                    Notes (optional)
                </label>
                <input
                    name="notes"
                    type="text"
                    disabled={isLoading}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mb-4"
                />
                <label
                    htmlFor="caloriesTarget"
                    className="font-semibold text-sm"
                >
                    Calories target
                </label>
                <input
                    name="caloriesTarget"
                    type="number"
                    disabled={isLoading}
                    value={caloriesTarget}
                    onChange={(e) => setCaloriesTarget(Number(e.target.value))}
                    className="mb-4"
                />
                <label
                    htmlFor="proteinsTarget"
                    className="font-semibold text-sm"
                >
                    Proteins target
                </label>
                <input
                    name="proteinsTarget"
                    type="number"
                    disabled={isLoading}
                    value={proteinsTarget}
                    onChange={(e) => setProteinsTarget(Number(e.target.value))}
                    className="mb-4"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-purple-500 font-semibold text-white p-3"
                >
                    {isLoading ? "Loading..." : "Add daily Log!"}
                </button>
            </form>
        </div>
    );
}
