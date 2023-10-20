interface Props {
    children?: React.ReactNode;
}

export default function CollapseMealContent({ children }: Props) {
    return (
        <div className="collapse-content">
            <div className="h-72 grid grid-cols-1 auto-rows-min md:grid-cols-[3fr_2fr] gap-4 my-4">
                {children}
            </div>
        </div>
    );
}

{
    /* <div className="h-72 flex flex-col gap-4 md:flex-row md:justify-between my-4">
{children}
</div> */
}
