import { Link } from "react-router-dom";
import DailyLogStats from "../../../components/DailyLogStats";
import { useDeleteDailyLogMutation } from "../../../store/api/apiSlice";
import formatDate from "../../../utils/formatDate";
import { TbTrashXFilled } from "react-icons/tb";

interface Props {
    id: string;
    date: string;
}

export default function DailyLogCard({ id, date }: Props) {
    const [deleteDailyLog, { isLoading }] = useDeleteDailyLogMutation();

    const handleClick = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
        await deleteDailyLog({ id: id });
    };

    const { formattedDate, weekDay } = formatDate(date);

    return (
        <Link to={`/daily-log/${id}`}>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="card-title flex justify-between mb-4">
                        <h2 className="flex flex-col sm:flex-row gap-0">
                            <span className="text-xl font-semibold">
                                {weekDay},
                            </span>
                            <span className="text-lg font-medium sm:text-xl sm:font-semibold">
                                {formattedDate}
                            </span>
                        </h2>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const modal = document.getElementById(
                                    "my_modal_1"
                                ) as HTMLDialogElement;

                                modal.showModal();
                            }}
                            disabled={isLoading}
                            className="btn btn-error aspect-square w-12 p-0"
                        >
                            {isLoading ? "..." : <TbTrashXFilled size={28} />}
                        </button>
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">
                                    Só para checar...
                                </h3>
                                <p className="py-4">
                                    Deseja realmente deletar esse dia?
                                </p>
                                <div className="w-full flex gap-2 justify-end">
                                    <button className="btn btn-active">
                                        Cancelar
                                    </button>
                                    <button
                                        className="btn btn-error"
                                        onClick={handleClick}
                                    >
                                        Sim, deletar!
                                    </button>
                                </div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        const modal = document.getElementById(
                                            "my_modal_1"
                                        ) as HTMLDialogElement;

                                        modal.close();
                                    }}
                                >
                                    close
                                </button>
                            </form>
                        </dialog>
                    </div>
                    <DailyLogStats dailyLogId={id} />
                </div>
            </div>
        </Link>
    );
}
