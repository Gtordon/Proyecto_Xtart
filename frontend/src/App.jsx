// Estructura de la aplicación: sesión, usuario, charlas y reservas, y la navegación entre pantallas.
// Las reservas del usuario se cargan aquí para marcar en el programa las charlas donde ya tiene plaza.
// Las pantallas cambian con <ViewTransition> de React: fundido suave y el título de la charla viaja entre pantallas.
import { useCallback, useEffect, useState, ViewTransition } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router';
import { cerrarSesionApi, getCharlas, getMisReservas, getUsuario } from './api/talks.js';
import { Avatar, Dialogo, Icono, Marca } from './components/Piezas.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import TalkPage from './pages/TalkPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MyReservationsPage from './pages/MyReservationsPage.jsx';

// Clave donde se guarda el token en el navegador
const CLAVE_TOKEN = 'sabitech_token';

const TITULOS = { '/': 'Programa', '/mis-reservas': 'Mis reservas', '/login': 'Entrar' };
const ROLES = { attendee: 'Asistente', organizer: 'Organización', access_staff: 'Personal de acceso' };

function leerToken() {
  try {
    return localStorage.getItem(CLAVE_TOKEN);
  } catch {
    return null; // Sin almacenamiento (modo privado): no hay sesión guardada
  }
}

function Navegacion({ token, usuario, onSalir, onNavegar }) {
  return (
    <>
      <div className="marca">
        <Marca />
        <div>
          <p className="marca__nombre">SABITECH</p>
          <p className="marca__ambito">Jornadas tecnológicas</p>
        </div>
      </div>

      <nav className="nav" aria-label="Principal">
        <p className="nav__grupo">Jornadas</p>
        <NavLink to="/" end className="nav__enlace" onClick={onNavegar}><Icono nombre="programa" />Programa</NavLink>
        <NavLink to="/mis-reservas" className="nav__enlace" onClick={onNavegar}><Icono nombre="entrada" />Mis reservas</NavLink>
      </nav>

      <div className="lateral__pie">
        {token ? (
          <div className="usuario">
            {usuario ? <Avatar nombre={usuario.name} tamano={28} /> : <span className="avatar avatar--vacio" />}
            <div className="usuario__texto">
              <p className="usuario__nombre">{usuario?.name ?? 'Cargando…'}</p>
              <p className="usuario__rol">{ROLES[usuario?.role] ?? ''}</p>
            </div>
            <button type="button" className="boton-icono" onClick={onSalir} aria-label="Salir">
              <Icono nombre="salir" />
            </button>
          </div>
        ) : (
          <Link to="/login" className="boton boton--secundario boton--ancho" onClick={onNavegar}>
            <Icono nombre="entrar" />Entrar
          </Link>
        )}
        <p className="creditos">
          Desarrollado por <span className="creditos__empresa">Umbral <span className="creditos__labs">Labs</span></span>
        </p>
      </div>
    </>
  );
}

function App() {
  const location = useLocation();
  const [charlas, setCharlas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Token de la sesión (null = sin sesión iniciada)
  const [token, setToken] = useState(leerToken);
  // Usuario de la sesión: nombre, correo y rol (null = aún no se sabe o no hay sesión)
  const [usuario, setUsuario] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Guarda o borra la sesión en un solo sitio, para que el estado y el navegador vayan a la par
  const guardarSesion = useCallback((nuevoToken) => {
    try {
      if (nuevoToken) localStorage.setItem(CLAVE_TOKEN, nuevoToken);
      else localStorage.removeItem(CLAVE_TOKEN);
    } catch {
      // Sin almacenamiento: la sesión dura lo que la pestaña
    }
    setToken(nuevoToken || null);
  }, []);

  // Sesión caducada o inválida: se borra el token (el usuario verá que tiene que entrar otra vez)
  const sesionInvalida = useCallback(() => guardarSesion(null), [guardarSesion]);

  // Cerrar sesión: primero se invalida el token en el servidor y después se borra en el navegador
  async function salir() {
    setMenuAbierto(false);
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
      setReservas([]);
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

  // Reservas del usuario: sirven para marcar "Tu plaza" en el programa y para Mis reservas
  const recargarReservas = useCallback(() => {
    if (!token) return Promise.resolve([]);
    return getMisReservas(token)
      .then((datos) => {
        setReservas(datos);
        return datos;
      })
      .catch((e) => {
        if (e.status === 401) guardarSesion(null);
        throw e;
      });
  }, [token, guardarSesion]);

  // Cada vez que se entra en el programa, pedimos charlas y reservas otra vez:
  // así las plazas libres están al día después de reservar, sin recargar la página.
  const enPrograma = location.pathname === '/';
  useEffect(() => {
    if (!enPrograma) return undefined;
    let cancelado = false;
    getCharlas()
      .then((datos) => {
        if (!cancelado) {
          setCharlas(datos);
          setError('');
        }
      })
      .catch(() => {
        if (!cancelado) setError('Ha ocurrido un error. No se pudo conectar con el servidor.');
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });
    recargarReservas().catch(() => {});
    return () => { cancelado = true; };
  }, [enPrograma, recargarReservas]);

  // Cada pantalla empieza arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const contexto = { token, reservas, recargarReservas, onSesionInvalida: sesionInvalida };
  const tituloMovil = TITULOS[location.pathname] ?? 'Charla';

  return (
    <div className="app">
      <aside className="lateral">
        <Navegacion token={token} usuario={usuario} onSalir={salir} />
      </aside>

      <header className="barra-movil">
        <span className="barra-movil__marca"><Marca /></span>
        <p className="barra-movil__titulo">{tituloMovil}</p>
        <button type="button" className="boton-icono" onClick={() => setMenuAbierto(true)} aria-label="Abrir menú">
          <Icono nombre="menu" tamano={20} />
        </button>
      </header>

      <Dialogo abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} etiqueta="Menú" className="dialogo--hoja">
        <button type="button" className="boton-icono hoja__cerrar" onClick={() => setMenuAbierto(false)} aria-label="Cerrar menú">
          <Icono nombre="cerrar" tamano={20} />
        </button>
        <Navegacion token={token} usuario={usuario} onSalir={salir} onNavegar={() => setMenuAbierto(false)} />
      </Dialogo>

      <main className="lienzo">
        <ViewTransition key={location.pathname} default="vt-pantalla">
          <div className="pantalla">
            <Routes location={location}>
              <Route
                path="/"
                element={<CatalogPage charlas={charlas} setCharlas={setCharlas} cargando={cargando} error={error} {...contexto} />}
              />
              <Route path="/charlas/:id" element={<TalkPage {...contexto} />} />
              <Route path="/login" element={<LoginPage onLogin={guardarSesion} />} />
              <Route path="/mis-reservas" element={<MyReservationsPage {...contexto} />} />
            </Routes>
          </div>
        </ViewTransition>
      </main>
    </div>
  );
}

export default App;
