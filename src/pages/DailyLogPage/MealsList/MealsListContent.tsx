import { useGetMealSummaryQuery } from "../../../store/api/apiSlice";
import useUser from "../../../hooks/authHooks/useUser";
import MealStats from "./MealStats";

interface Props {
    mealId: string;
    children?: React.ReactNode;
}

export default function MealsListContent({ mealId, children }: Props) {
    const { accessToken } = useUser();
    const { data, error, isLoading } = useGetMealSummaryQuery(
        { id: mealId },
        { skip: !Boolean(accessToken) }
    );

    let footer;
    if (isLoading) {
        footer = <p>Loading...</p>;
    } else if (error) {
        footer = <p className="text-red-600">Error on fetching</p>;
    } else if (data) {
        footer = (
            <div className="flex flex-col md:hidden">
                <h3 className="text-base">
                    Logando em <strong>{data.name}</strong>
                </h3>
                <MealStats
                    kcals={data.kcals}
                    carbs={data.carbs}
                    proteins={data.proteins}
                    fats={data.fats}
                />
            </div>
        );
    }

    return (
        <div className="drawer md:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <div className="flex items-center justify-between my-3">
                    <h2>Ingredientes</h2>
                    <label
                        htmlFor="my-drawer-2"
                        className="btn btn-neutral btn-md aspect-square drawer-button md:hidden"
                    >
                        +
                    </label>
                </div>
                {children}
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu p-4 w-5/6 sm:w-1/2 md:w-full h-[calc(100vh-64px)] mt-[64px] bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <div className="flex justify-between items-center">
                        <h2>Adicionar Ingrediente</h2>
                        <label
                            htmlFor="my-drawer-2"
                            className="btn btn-ghost btn-md aspect-square drawer-button md:hidden"
                        >
                            x
                        </label>
                    </div>
                    <div>{footer}</div>
                </ul>
            </div>
        </div>
    );
}

{
    /* <div>
<div className="flex items-center justify-between my-3">
    <h2>Ingredientes</h2>
    <button className="btn btn-neutral btn-md aspect-square">
        +
    </button>
</div>
{children}
</div> */
}
