import { useState } from "react";
import Footer from "./Footer";

interface Props {
    mealId: string;
    children?: React.ReactNode;
}

export default function Drawer({ mealId, children }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    if (isOpen) {
        return (
            <div>
                <div className="fixed top-[64px] h-[calc(100vh-64px)] left-0 flex w-full z-10">
                    <div className="w-10/12 h-full bg-base-200 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between">
                                <h2>Add Ingredient Drawer</h2>
                                <button
                                    className="btn btn-ghost"
                                    onClick={() => setIsOpen(false)}
                                >
                                    x
                                </button>
                            </div>
                            {children}
                        </div>
                        <Footer mealId={mealId} />
                    </div>
                    <div
                        onClick={() => setIsOpen(false)}
                        className="w-1/6 h-full bg-black opacity-50"
                    ></div>
                </div>

                <button
                    className="btn btn-neutral btn-md aspect-square"
                    onClick={() => setIsOpen(true)}
                >
                    +
                </button>
            </div>
        );
    } else {
        return (
            <button
                className="btn btn-neutral btn-md aspect-square"
                onClick={() => setIsOpen(true)}
            >
                +
            </button>
        );
    }
}
