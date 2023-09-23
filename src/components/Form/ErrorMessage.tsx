interface Props {
    message?: string;
}

export default function ErrorMessage({ message }: Props) {
    return <p role="alert">{message ? message : "Campo inválido."}</p>;
}
