import { Link } from "react-router";

// Cabecera con enlaces entre páginas. Con sesión iniciada, muestra el nombre del usuario y el botón Salir.
function Cabecera({ haySesion, usuario, onSalir }) {
    return (
        <header>
            <nav>
                <Link to="/">Charlas</Link>
                {' . '}
                <Link to="/mis-reservas">Mis Reservas</Link>
                {' . '}
                {haySesion ? (
                    <>
                        {usuario && <span>Hola, {usuario.name}</span>}
                        {' . '}
                        <button type="button" onClick={onSalir}>Salir</button>
                    </>
                ) : (
                    <Link to="/login">Entrar</Link>
                )}
            </nav>
        </header>
    );
}

export default Cabecera;
