interface Props {
    mealId: string;
    children?: React.ReactNode;
}

export default function MealsListContent({ mealId, children }: Props) {
    return (
        <div>
            <div className="flex items-center justify-between my-3">
                <h2>Ingredientes</h2>
                <button className="btn btn-neutral btn-md aspect-square">
                    +
                </button>
            </div>
            {children}
        </div>
    );
}
