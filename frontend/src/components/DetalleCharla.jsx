import { useState } from 'react';

// Detalle de una charla con el botón de reservar.
// La reserva necesita sesión iniciada: el servidor saca el usuario del token.
function DetalleCharla({ charla, haySesion, onVolver, onReservar }) {
  const [enviando, setEnviando] = useState(false);
  const [reservada, setReservada] = useState(false);
  const [error, setError] = useState('');
  const completa = charla.available_seats === 0;

  async function reservar() {
    setError('');
    setEnviando(true);
    try {
      await onReservar(charla.id);
      setReservada(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setEnviando(false);
    }
  }

  let accion;
  if (reservada) {
    accion = <p role="status">Reserva confirmada.</p>;
  } else if (completa) {
    accion = <p>Esta charla está completa.</p>;
  } else if (!haySesion) {
    accion = <p>Inicia sesión para reservar una plaza.</p>;
  } else {
    accion = (
      <button onClick={reservar} disabled={enviando}>
        {enviando ? 'Reservando…' : 'Reservar'}
      </button>
    );
  }

  return (
    <main>
      <button onClick={onVolver}>← Volver</button>
      <h1>{charla.title}</h1>
      <p>Ponente: {charla.speaker}</p>
      <p>Plazas libres: {charla.available_seats}</p>
      {accion}
      {error && <p className="error" role="alert">{error}</p>}
    </main>
  );
}

export default DetalleCharla;
