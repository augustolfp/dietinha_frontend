interface Props {
    mealId: string;
    children?: React.ReactNode;
}

export default function MealsListContent({ mealId, children }: Props) {
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
                    <li>
                        <a>Sidebar Item 1</a>
                    </li>
                    <li>
                        <a>Sidebar Item 2</a>
                    </li>
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
