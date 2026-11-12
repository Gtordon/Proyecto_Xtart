import { useState } from 'react';
import { useNavigate } from 'react-router';
import { iniciarSesion } from '../api/talks.js';

// Formulario de acceso. Valida en el navegador antes de enviar.
function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState({});
  const [errorServidor, setErrorServidor] = useState('');
  const [enviando, setEnviando] = useState(false);

  // Devuelve un objeto con los errores de cada campo (vacío si todo está bien)
  function validar() {
    const nuevos = {};
    if (!email.includes('@')) nuevos.email = 'El correo debe contener @.';
    if (password === '') nuevos.password = 'La contraseña no puede estar vacía.';
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
      navigate('/');
    } catch (e) {
      setErrorServidor(e.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main>
      <h1>Iniciar sesión</h1>

      <form onSubmit={enviar} noValidate>
        <p>
          <label htmlFor="email">Correo</label>
          <br />
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errores.email)}
            aria-describedby={errores.email ? 'error-email' : undefined}
          />
        </p>
        {errores.email && <p id="error-email" className="error" role="alert">Error: {errores.email}</p>}

        <p>
          <label htmlFor="password">Contraseña</label>
          <br />
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={Boolean(errores.password)}
            aria-describedby={errores.password ? 'error-password' : undefined}
          />
        </p>
        {errores.password && <p id="error-password" className="error" role="alert">Error: {errores.password}</p>}

        <button type="submit" disabled={enviando}>
          {enviando ? 'Entrando…' : 'Entrar'}
        </button>
      </form>

      {errorServidor && <p className="error" role="alert">Error: {errorServidor}</p>}
    </main>
  );
}

export default LoginPage;