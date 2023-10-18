import CredentialsBlur from "./Backgrounds/CredentialsBlur";

interface Props {
    children?: React.ReactNode;
}

export default function CredentialsContainer({ children }: Props) {
    return (
        <div className="h-[calc(100vh-64px)] w-full relative">
            <CredentialsBlur />
            <div className="container mx-auto pt-4 lg:pt-12">
                <div className="hero">
                    <div className="hero-content flex-col lg:flex-row max-w-sm md:max-w-md lg:max-w-4xl">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
