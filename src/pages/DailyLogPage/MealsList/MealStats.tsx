interface Props {
    kcals: number;
    carbs: number;
    proteins: number;
    fats: number;
}

export default function MealStats({ ...data }: Props) {
    return (
        <div className="flex gap-x-3 text-base font-medium text-primary-focus">
            <div>{data.kcals}kcal</div>
            <div>{data.carbs}C</div>
            <div>{data.proteins}P</div>
            <div>{data.fats}G</div>
        </div>
    );
}
