import { useAddCountedDayMutation } from "../../store/api/apiSlice";

export default function NewCountedDayForm() {
    const [addCountedDay, { isLoading }] = useAddCountedDayMutation();

    const hardcodedCountedDay = {
        day: "2024-03-25",
        notes: "No notessss",
        caloriesTarget: 2000,
        proteinsTarget: 150,
    };

    const onAddCountedDayClicked = async () => {
        await addCountedDay({ ...hardcodedCountedDay });
    };

    return (
        <div>
            <h2>New Counted Day</h2>
            <button onClick={onAddCountedDayClicked}>
                Add hardcoded counted day!
            </button>
        </div>
    );
}
