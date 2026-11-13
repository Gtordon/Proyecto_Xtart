import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { cerrarSesionApi, getCharlas, getUsuario } from './api/talks.js';
import Cabecera from './components/Cabecera.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import TalkPage from './pages/TalkPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MyReservationsPage from './pages/MyReservationsPage.jsx';

// Clave donde se guarda el token en el navegador
const CLAVE_TOKEN = 'sabitech_token';

function App() {
  const [charlas, setCharlas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Token de la sesión (null = sin sesión iniciada)
  const [token, setToken] = useState(() => localStorage.getItem(CLAVE_TOKEN));

  // Usuario de la sesión: nombre, correo y rol (null = aún no se sabe o no hay sesión)
  const [usuario, setUsuario] = useState(null);

  // Guarda o borra la sesión en un solo sitio, para que el estado y el navegador vayan a la par
  function guardarSesion(nuevoToken) {
    if (nuevoToken) localStorage.setItem(CLAVE_TOKEN, nuevoToken);
    else localStorage.removeItem(CLAVE_TOKEN);

    setToken(nuevoToken || null);
    if (!nuevoToken) setUsuario(null);
  }

  // Cerrar sesión: primero se invalida el token en el servidor y después se borra en el navegador
  async function salir() {
    const tokenActual = token;
    guardarSesion(null);

    try {
      await cerrarSesionApi(tokenActual);
    } catch {
      // Si falla la llamada remota, igual cerramos la sesión local.
    }
  }

  // Si la sesión cambia en otra pestaña, lo reflejamos aquí también
  useEffect(() => {
    function alCambiarSesion(evento) {
      if (evento.key === CLAVE_TOKEN) {
        const nuevoToken = evento.newValue;
        setToken(nuevoToken);
        if (!nuevoToken) setUsuario(null);
      }
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
  }, [token]);

  // Al abrir la web, pedimos la lista de charlas a la API
  useEffect(() => {
    let cancelado = false;
    getCharlas()
      .then((datos) => {
        if (!cancelado) setCharlas(datos);
      })
      .catch(() => {
        if (!cancelado) setError('No se pudo conectar con el servidor. ¿Está encendido el backend?');
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });

    return () => { cancelado = true; };
  }, []);

  return (
    <>
      <Cabecera haySesion={Boolean(token)} usuario={usuario} onSalir={salir} />
      <Routes>
        <Route path="/" element={<CatalogPage charlas={charlas} cargando={cargando} error={error} />} />
        <Route path="/charlas/:id" element={<TalkPage token={token} onSesionInvalida={() => guardarSesion(null)} />} />
        <Route path="/login" element={<LoginPage onLogin={guardarSesion} />} />
        <Route path="/mis-reservas" element={<MyReservationsPage token={token} />} />
      </Routes>
    </>
  );
}

export default App;
