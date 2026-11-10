import { useState } from 'react';

// Detalle de una charla con el botón de reservar.
// La reserva necesita sesión iniciada: el servidor saca el usuario del token.
function DetalleCharla({ charla, haySesion, onVolver, onReservar }) {
  const [enviando, setEnviando] = useState(false);
  // Texto que sustituye al botón cuando ya hay reserva (recién hecha o anterior)
  const [reservada, setReservada] = useState('');
  const [error, setError] = useState('');
  const completa = charla.available_seats === 0;

  async function reservar() {
    setError('');
    setEnviando(true);
    try {
      await onReservar(charla.id);
      setReservada('Reserva confirmada.');
    } catch (e) {
      // Si ya tenía reserva, no tiene sentido volver a pulsar: se quita el botón
      if (e.code === 'already_reserved') setReservada(e.message);
      else setError(e.message);
    } finally {
      setEnviando(false);
    }
  }

  let accion;
  if (reservada) {
    accion = <p role="status">{reservada}</p>;
  } else if (completa) {
    accion = <p>Esta charla está completa.</p>;
  } else if (!haySesion) {
    accion = <p>Inicia sesión para reservar una plaza.</p>;
  } else {
    accion = (
      <button type="button" onClick={reservar} disabled={enviando}>
        {enviando ? 'Reservando…' : 'Reservar'}
      </button>
    );
  }

  return (
    <main>
      <button type="button" onClick={onVolver}>← Volver</button>
      <h1>{charla.title}</h1>
      <p>Ponente: {charla.speaker}</p>
      <p>Plazas libres: {charla.available_seats}</p>
      {accion}
      {error && <p className="error" role="alert">{error}</p>}
    </main>
  );
}

export default DetalleCharla;
