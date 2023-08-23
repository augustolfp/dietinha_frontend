interface Props {
    id: string;
    date: string;
    notes: string;
    userId: string;
    caloriesTarget: number;
    proteinsTarget: number;
    carbs: number;
    fats: number;
    proteins: number;
    kcals: number;
}

export default function DashboardCard(props: Props) {
    return (
        <div className="bg-purple-200 p-4 flex flex-col justify-center gap-4">
            <div className="bg-purple-100 p-2">
                <h4>Data:</h4>
                <span>{props.date}</span>
            </div>

            <div className="bg-purple-100 p-2">
                <h4>Alvo de proteinas:</h4>
                <span>{props.proteinsTarget} g</span>
            </div>

            <div className="bg-purple-100 p-2">
                <h4>Proteinas consumidas:</h4>
                <span>{props.proteins}</span>
            </div>

            <div className="bg-purple-100 p-2">
                <h4>Alvo de calorias:</h4>
                <span>{props.caloriesTarget} kCal</span>
            </div>

            <div className="bg-purple-100 p-2">
                <h4>Calorias consumidas:</h4>
                <span>{props.kcals}</span>
            </div>
        </div>
    );
}
