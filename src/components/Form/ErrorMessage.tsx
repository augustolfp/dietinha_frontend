interface Props {
    message?: string;
}

export default function ErrorMessage({ message }: Props) {
    return (
        <p role="alert" className="text-xs text-red-700">
            {message ? message : "Campo inválido."}
        </p>
    );
}
