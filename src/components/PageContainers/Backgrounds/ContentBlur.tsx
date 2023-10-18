export default function ContentBlur() {
    return (
        <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-base-content w-full aspect-square rounded-full blur-3xl opacity-5"></div>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-info w-4/6 aspect-square rounded-full blur-3xl opacity-5"></div>
        </>
    );
}
