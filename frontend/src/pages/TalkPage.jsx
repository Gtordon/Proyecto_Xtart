import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getCharla, reservarPlaza } from '../api/talks.js';
import DetalleCharla from '../components/DetalleCharla.jsx';

// Detalle de una charla: lee el número de la URL (useParams) y lo pide a la API
function TalkPage({ token, onSesionInvalida }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [charla, setCharla] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelado = false;
    setCargando(true);
    setError('');
    getCharla(id)
      .then((datos) => {
        if (!cancelado) setCharla(datos);
      })
      .catch(() => {
        if (!cancelado) setError('No se pudo cargar la charla.');
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });
    return () => { cancelado = true; };
  }, [id]);

  // Reservar: si sale bien baja una plaza; si falla, reacciona según el "code" y relanza el error
  async function reservar(idCharla) {
    try {
      await reservarPlaza(idCharla, token);
      setCharla((actual) => ({ ...actual, available_seats: Math.max(0, actual.available_seats - 1) }));
    } catch (e) {
      if (e.code === 'unauthenticated') onSesionInvalida();
      else if (e.code === 'talk_full') setCharla((actual) => ({ ...actual, available_seats: 0 }));
      throw e;
    }
  }

  if (cargando) return <main><p>Cargando charla…</p></main>;
  if (error) return <main><p className="error">{error}</p></main>;

  return (
    <DetalleCharla
      charla={charla}
      haySesion={Boolean(token)}
      onVolver={() => navigate('/')}
      onReservar={reservar}
    />
  );
}

export default TalkPage;