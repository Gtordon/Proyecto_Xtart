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
import HomePage from './pages/HomePage.jsx';
import SpeakersPage from './pages/SpeakersPage.jsx';
import InfoPage from './pages/InfoPage.jsx';
import LegalPage from './pages/LegalPage.jsx';

// Clave donde se guarda el token en el navegador
const CLAVE_TOKEN = 'sabitech_token';

const TITULOS = {
  '/': 'Inicio', '/programa': 'Programa', '/ponentes': 'Ponentes', '/informacion': 'Información',
  '/mis-reservas': 'Mis reservas', '/login': 'Entrar', '/legal': 'Aviso legal',
};
// Pantallas que muestran datos de las charlas: al entrar en ellas se piden otra vez
const CON_CHARLAS = ['/', '/programa', '/ponentes', '/informacion'];
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
        <NavLink to="/" end className="nav__enlace" onClick={onNavegar}><Icono nombre="inicio" />Inicio</NavLink>
        <NavLink to="/programa" className="nav__enlace" onClick={onNavegar}><Icono nombre="programa" />Programa</NavLink>
        <NavLink to="/ponentes" className="nav__enlace" onClick={onNavegar}><Icono nombre="ponentes" />Ponentes</NavLink>
        <NavLink to="/informacion" className="nav__enlace" onClick={onNavegar}><Icono nombre="info" />Información</NavLink>
        <p className="nav__grupo">Tu cuenta</p>
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

// Pie de página común: enlaces de las jornadas, de la cuenta y legales, y el crédito de Umbral Labs
function Pie({ token }) {
  return (
    <footer className="pie">
      <div className="pie__columnas">
        <div className="pie__marca">
          <p className="pie__nombre">SABITECH</p>
          <p>Jornadas tecnológicas con reserva de plaza en la web.</p>
          <div className="pie__redes">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram (abre en otra pestaña)">
              <Icono nombre="instagram" tamano={18} />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook (abre en otra pestaña)">
              <Icono nombre="facebook" tamano={18} />
            </a>
          </div>
        </div>
        <nav aria-label="Jornadas">
          <p className="pie__grupo">Jornadas</p>
          <Link to="/programa">Programa</Link>
          <Link to="/ponentes">Ponentes</Link>
          <Link to="/informacion">Información</Link>
        </nav>
        <nav aria-label="Tu cuenta">
          <p className="pie__grupo">Tu cuenta</p>
          {token ? <Link to="/mis-reservas">Mis reservas</Link> : <Link to="/login">Entrar</Link>}
          <Link to="/informacion">Contacto</Link>
        </nav>
        <nav aria-label="Legal">
          <p className="pie__grupo">Legal</p>
          <Link to="/legal#aviso-legal">Aviso legal</Link>
          <Link to="/legal#privacidad">Privacidad</Link>
          <Link to="/legal#cookies">Cookies</Link>
        </nav>
      </div>
      <p className="pie__final">
        © 2026 SABITECH · Desarrollado por <span className="creditos__empresa">Umbral <span className="creditos__labs">Labs</span></span>
      </p>
    </footer>
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

  // Cada vez que se entra en una pantalla con charlas, pedimos charlas y reservas otra vez:
  // así las plazas libres están al día después de reservar, sin recargar la página.
  const enPrograma = CON_CHARLAS.includes(location.pathname);
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
  }, [enPrograma, location.pathname, recargarReservas]);

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
              <Route path="/" element={<HomePage charlas={charlas} cargando={cargando} error={error} token={token} />} />
              <Route path="/ponentes" element={<SpeakersPage charlas={charlas} cargando={cargando} error={error} />} />
              <Route path="/informacion" element={<InfoPage charlas={charlas} />} />
              <Route path="/legal" element={<LegalPage />} />
              <Route
                path="/programa"
                element={<CatalogPage charlas={charlas} setCharlas={setCharlas} cargando={cargando} error={error} {...contexto} />}
              />
              <Route path="/charlas/:id" element={<TalkPage {...contexto} />} />
              <Route path="/login" element={<LoginPage onLogin={guardarSesion} />} />
              <Route path="/mis-reservas" element={<MyReservationsPage {...contexto} />} />
            </Routes>
          </div>
        </ViewTransition>
        <Pie token={token} />
      </main>
    </div>
  );
}

export default App;
