import { useGetIngredientsQuery } from "../../store/api/apiSlice";
import useUser from "../../hooks/authHooks/useUser";
import IngredientsListItem from "../IngredientsListItem";

interface Props {
    mealId: string;
}

export default function IngredientsList({ mealId }: Props) {
    const { accessToken } = useUser();
    const { data, error, isFetching } = useGetIngredientsQuery(
        { id: mealId },
        { skip: !Boolean(accessToken) }
    );

    let content;
    if (isFetching) {
        content = <p>Loading...</p>;
    } else if (error) {
        content = <p className="text-red-600">Error on fetching</p>;
    } else if (data) {
        content = (
            <>
                {data.map((ingredient) => (
                    <div key={ingredient.id}>
                        <IngredientsListItem ingredient={ingredient} />
                    </div>
                ))}
            </>
        );
    }

    return (
        <div>
            <h4>List de ingredientes:</h4>
            <div>{content}</div>
        </div>
    );
}
