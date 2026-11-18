// Entrar: formulario con validación en el navegador antes de enviar (correo con @ y contraseña no vacía).
// Tras entrar, vuelve a la pantalla de la que venías (la charla, Mis reservas o el programa).
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { iniciarSesion } from '../api/talks.js';
import { Marca } from '../components/Piezas.jsx';

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState({});
  const [errorServidor, setErrorServidor] = useState('');
  const [enviando, setEnviando] = useState(false);

  function validar() {
    const nuevos = {};
    if (!email.includes('@')) nuevos.email = 'El correo debe contener @.';
    if (password === '') nuevos.password = 'Escribe tu contraseña.';
    return nuevos;
  }

  async function enviar(evento) {
    evento.preventDefault();
    setErrorServidor('');
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    setEnviando(true);
    try {
      const datos = await iniciarSesion(email, password);
      onLogin(datos.token);
      navigate(location.state?.volver ?? '/programa');
    } catch (e) {
      setErrorServidor(e.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="pagina pagina--acceso">
      <section className="tarjeta acceso">
        <Marca />
        <h1 className="acceso__titulo">Entrar en SABITECH</h1>
        <p className="acceso__sub">Con tu cuenta de asistente reservas plaza y ves tus entradas.</p>

        <form onSubmit={enviar} noValidate className="formulario">
          <div className="campo">
            <label htmlFor="email">Correo</label>
            <input id="email" type="email" autoComplete="email" inputMode="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(errores.email)} aria-describedby={errores.email ? 'error-email' : undefined} />
            {errores.email && <p id="error-email" className="campo__error" role="alert">{errores.email}</p>}
          </div>

          <div className="campo">
            <label htmlFor="password">Contraseña</label>
            <input id="password" type="password" autoComplete="current-password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={Boolean(errores.password)} aria-describedby={errores.password ? 'error-password' : undefined} />
            {errores.password && <p id="error-password" className="campo__error" role="alert">{errores.password}</p>}
          </div>

          <button type="submit" className="boton boton--primario boton--ancho" disabled={enviando}>
            {enviando ? 'Entrando…' : 'Entrar'}
          </button>
          {errorServidor && <p className="mensaje mensaje--error" role="alert">{errorServidor}</p>}
        </form>
      </section>
      <p className="nota nota--centro">No hay registro público: las cuentas las crea la organización de las jornadas.</p>
    </div>
  );
}

export default LoginPage;
