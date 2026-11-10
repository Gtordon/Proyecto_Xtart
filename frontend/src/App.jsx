import { useEffect, useState } from 'react';
import { getCharlas, getCharla, reservarPlaza } from './api/talks.js';
import ListaCharlas from './components/ListaCharlas.jsx';
import DetalleCharla from './components/DetalleCharla.jsx';

// Clave donde el login guardará el token de Sanctum. Mientras no exista el login, no hay sesión.
const CLAVE_TOKEN = 'sabitech_token';

function App() {
  // Lista de charlas que viene de la API
  const [charlas, setCharlas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Charla abierta en el detalle (null = se ve la lista)
  const [detalle, setDetalle] = useState(null);

  // Token de la sesión (null = sin sesión iniciada)
  const [token, setToken] = useState(() => localStorage.getItem(CLAVE_TOKEN));

  // Al abrir la página, pedimos la lista a la API
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

  // Al elegir una charla, pedimos su detalle a la API
  function abrirDetalle(id) {
    getCharla(id)
      .then(setDetalle)
      .catch(() => setError('No se pudo cargar la charla.'));
  }

  // Cambia las plazas libres de una charla en la lista y en el detalle
  function ajustarPlazas(id, calcular) {
    setCharlas((actuales) => actuales.map((c) => (c.id === id ? { ...c, available_seats: calcular(c.available_seats) } : c)));
    setDetalle((actual) => (actual && actual.id === id ? { ...actual, available_seats: calcular(actual.available_seats) } : actual));
  }

  // Reservar: la API identifica al usuario por el token.
  // Si sale bien, baja una plaza. Si falla, reacciona según el "code" y relanza el error
  // para que el detalle muestre el mensaje.
  async function reservar(id) {
    try {
      await reservarPlaza(id, token);
      ajustarPlazas(id, (plazas) => Math.max(0, plazas - 1));
    } catch (e) {
      if (e.code === 'unauthenticated') {
        // Sesión caducada o inválida: se borra el token y el detalle pedirá iniciar sesión
        localStorage.removeItem(CLAVE_TOKEN);
        setToken(null);
      } else if (e.code === 'talk_full') {
        // El servidor dice que no quedan plazas: lo reflejamos en pantalla
        ajustarPlazas(id, () => 0);
      }
      throw e;
    }
  }

  if (detalle) {
    return (
      <DetalleCharla
        charla={detalle}
        haySesion={Boolean(token)}
        onVolver={() => setDetalle(null)}
        onReservar={reservar}
      />
    );
  }

  return (
    <main>
      <h1>SABITECH WEB</h1>
      <h2>Charlas</h2>

      {cargando && <p>Cargando charlas…</p>}
      {error && <p className="error">{error}</p>}
      {!cargando && !error && charlas.length === 0 && <p>Todavía no hay charlas.</p>}
      {!cargando && !error && charlas.length > 0 && (
        <ListaCharlas charlas={charlas} onElegir={abrirDetalle} />
      )}
    </main>
  );
}

export default App;
