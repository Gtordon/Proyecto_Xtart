import { Link } from "react-router";

//Cabecera con enlaces entre paginas.
function Cabecera({haySesion, onSalir}) {
    return (
        <header>
            <nav>
                <Link to="/">Charlas</Link>
                {' . '}
                <Link to="/mis-reservas">Mis Reservas</Link>
                {' . '}
                {haySesion ? (
                    <button onClick={onSalir}>Salir</button>
                ) : (
                    <Link to="/login">Entrar</Link>
                )}
            </nav>
        </header>
    );
}

export default Cabecera;