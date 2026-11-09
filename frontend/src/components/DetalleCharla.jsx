// Detalle de una charla con su botón de reservar.
// La reserva todavía no se guarda en el servidor: eso llega con el login y las reservas.
function DetalleCharla({ charla, onVolver, onReservar }) {
  const completa = charla.available_seats === 0;

  return (
    <main>
      <button onClick={onVolver}>← Volver</button>
      <h1>{charla.title}</h1>
      <p>Ponente: {charla.speaker}</p>
      <p>Plazas libres: {charla.available_seats}</p>
      <button onClick={() => onReservar(charla.id)} disabled={completa}>
        {completa ? 'Completa' : 'Reservar plaza'}
      </button>
    </main>
  );
}

export default DetalleCharla;
