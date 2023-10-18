interface Props {
    children?: React.ReactNode;
}

export default function ContentContainer({ children }: Props) {
    return (
        <div className="bg-gradient-to-b from-base-300 to-base-100 w-full min-h-screen pt-6">
            <div className="container mx-auto flex flex-col gap-6 max-w-md p-3 sm:max-w-5xl sm:px-6 md:gap-10">
                {children}
            </div>
        </div>
    );
}
