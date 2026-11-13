import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { cerrarSesionApi, getCharlas, getUsuario } from './api/talks.js';
import Cabecera from './components/Cabecera.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import TalkPage from './pages/TalkPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MyReservationsPage from './pages/MyReservationsPage.jsx';

// Clave donde se guarda el token en el navegador
const CLAVE_TOKEN = 'sabitech_token';

function App() {
  const location = useLocation();
  const [charlas, setCharlas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Token de la sesión (null = sin sesión iniciada)
  const [token, setToken] = useState(() => localStorage.getItem(CLAVE_TOKEN));

  // Usuario de la sesión: nombre, correo y rol (null = aún no se sabe o no hay sesión)
  const [usuario, setUsuario] = useState(null);

  // Guarda o borra la sesión en un solo sitio, para que el estado y el navegador vayan a la par
  const guardarSesion = useCallback((nuevoToken) => {
    if (nuevoToken) localStorage.setItem(CLAVE_TOKEN, nuevoToken);
    else localStorage.removeItem(CLAVE_TOKEN);
    setToken(nuevoToken || null);
  }, []);

  // Sesión caducada o inválida: se borra el token (el usuario verá que tiene que entrar otra vez)
  const sesionInvalida = useCallback(() => guardarSesion(null), [guardarSesion]);

  // Cerrar sesión: primero se invalida el token en el servidor y después se borra en el navegador
  async function salir() {
    await cerrarSesionApi(token);
    guardarSesion(null);
  }

  // Si la sesión cambia en otra pestaña, lo reflejamos aquí también
  useEffect(() => {
    function alCambiarSesion(evento) {
      if (evento.key === CLAVE_TOKEN) setToken(evento.newValue);
    }
    window.addEventListener('storage', alCambiarSesion);
    return () => window.removeEventListener('storage', alCambiarSesion);
  }, []);

  // Con sesión, pedimos quién es el usuario. Si el servidor responde 401, la sesión ha caducado.
  useEffect(() => {
    if (!token) {
      setUsuario(null);
      return undefined;
    }
    let cancelado = false;
    getUsuario(token)
      .then((datos) => {
        if (!cancelado) setUsuario(datos);
      })
      .catch((e) => {
        if (!cancelado && e.status === 401) guardarSesion(null);
      });
    return () => { cancelado = true; };
  }, [token, guardarSesion]);

  // Cada vez que se entra en el catálogo, pedimos la lista otra vez a la API.
  // Así las plazas libres están al día después de reservar, sin recargar la página.
  const enCatalogo = location.pathname === '/';
  useEffect(() => {
    if (!enCatalogo) return undefined;
    let cancelado = false;
    getCharlas()
      .then((datos) => {
        if (!cancelado) {
          setCharlas(datos);
          setError('');
        }
      })
      .catch(() => {
        if (!cancelado) setError('No se pudo conectar con el servidor. ¿Está encendido el backend?');
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });
    return () => { cancelado = true; };
  }, [enCatalogo]);

  return (
    <>
      <Cabecera haySesion={Boolean(token)} usuario={usuario} onSalir={salir} />
      <Routes>
        <Route path="/" element={<CatalogPage charlas={charlas} cargando={cargando} error={error} />} />
        <Route path="/charlas/:id" element={<TalkPage token={token} onSesionInvalida={sesionInvalida} />} />
        <Route path="/login" element={<LoginPage onLogin={guardarSesion} />} />
        <Route path="/mis-reservas" element={<MyReservationsPage token={token} onSesionInvalida={sesionInvalida} />} />
      </Routes>
    </>
  );
}

export default App;
