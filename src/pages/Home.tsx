import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h1>Bem-vindo ao App dietinha!</h1>
            <div>
                <Link to="/login">Ir para a página de login</Link>
            </div>
            <div>
                <Link to="register">Ir para a página de cadastro</Link>
            </div>
            <div>
                <Link to="/dashboard">Ir para a dashboard</Link>
            </div>
        </div>
    );
}
