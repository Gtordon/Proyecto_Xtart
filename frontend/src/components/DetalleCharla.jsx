import FormularioReserva from './FormularioReserva.jsx';

// Detalle de una charla: datos y, si quedan plazas, el formulario de reserva.
function DetalleCharla({ charla, onVolver, onReservar }) {
  const completa = charla.available_seats === 0;

  return (
    <main>
      <button onClick={onVolver}>← Volver</button>
      <h1>{charla.title}</h1>
      <p>Ponente: {charla.speaker}</p>
      <p>Plazas libres: {charla.available_seats}</p>

      {completa ? (
        <p>Esta charla está completa.</p>
      ) : (
        <FormularioReserva onReservar={(datos) => onReservar(charla.id, datos)} />
      )}
    </main>
  );
}

export default DetalleCharla;
