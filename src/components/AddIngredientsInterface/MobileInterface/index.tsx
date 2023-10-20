import { useState } from "react";
import Drawer from "./Drawer";
import AddIngredientsForm from "../AddIngredientsForm";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
    mealId: string;
}

export default function MobileInterface({ mealId }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-base text-base-content font-medium">
                    Ingredientes
                </h2>
                <button
                    className="btn btn-neutral btn-sm"
                    onClick={() => setIsOpen(true)}
                    disabled={isOpen}
                >
                    + Ingrediente
                </button>
            </div>
            {isOpen && (
                <Drawer onClose={() => setIsOpen(false)}>
                    <div className="flex flex-col gap-4">
                        <Header onClose={() => setIsOpen(false)} />
                        <AddIngredientsForm mealId={mealId} />
                    </div>
                    <Footer mealId={mealId} />
                </Drawer>
            )}
        </div>
    );
}
