import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router';
import { getMisReservas } from '../api/talks.js';

// Datos de ejemplo mientras el backend no tenga GET /api/reservations.
// Solo se muestran si el servidor responde 404, y siempre con un aviso visible.
const RESERVAS_EJEMPLO = [
  { id: 1, reference: 'RES-001', status: 'confirmed', talk: { id: 2, title: 'Ciberseguridad en aplicaciones web', starts_at: null, room: 'Sala 2' } },
  { id: 2, reference: 'RES-003', status: 'cancelled', talk: { id: 3, title: 'Desarrollo de aplicaciones moviles', starts_at: null, room: 'Sala 3' } },
];

const TEXTO_ESTADO = { confirmed: 'Confirmada', cancelled: 'Cancelada' };

// Fecha legible en español, o un guion si no viene
function formatearFecha(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' });
}

// Mis reservas: solo con sesión iniciada. Sin sesión, lleva al login.
function MyReservationsPage({ token, onSesionInvalida }) {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [deEjemplo, setDeEjemplo] = useState(false);

  useEffect(() => {
    if (!token) return undefined;
    let cancelado = false;
    setCargando(true);
    setError('');
    getMisReservas(token)
      .then((datos) => {
        if (cancelado) return;
        setReservas(datos);
        setDeEjemplo(false);
      })
      .catch((e) => {
        if (cancelado) return;
        if (e.status === 401) {
          onSesionInvalida();
        } else if (e.status === 404) {
          // La ruta aún no existe en el servidor: datos de ejemplo con aviso
          setReservas(RESERVAS_EJEMPLO);
          setDeEjemplo(true);
        } else {
          setError('No se pudieron cargar tus reservas. ¿Está encendido el backend?');
        }
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });
    return () => { cancelado = true; };
  }, [token, onSesionInvalida]);

  if (!token) return <Navigate to="/login" replace />;

  return (
    <main>
      <h1>Mis reservas</h1>

      {deEjemplo && (
        <p role="status">
          Datos de ejemplo: el servidor todavía no tiene la ruta de reservas.
        </p>
      )}

      {cargando && <p>Cargando tus reservas…</p>}
      {error && <p className="error" role="alert">{error}</p>}
      {!cargando && !error && reservas.length === 0 && (
        <p>
          No tienes reservas. <Link to="/">Ver charlas</Link>
        </p>
      )}

      {!cargando && !error && reservas.length > 0 && (
        <ul>
          {reservas.map((r) => (
            <li key={r.id}>
              <h2>{r.talk?.title ?? 'Charla'}</h2>
              <p>Fecha: {formatearFecha(r.talk?.starts_at)}</p>
              <p>Sala: {r.talk?.room ?? '—'}</p>
              <p>Estado: {TEXTO_ESTADO[r.status] ?? r.status}</p>
              <p>Referencia: {r.reference}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default MyReservationsPage;
