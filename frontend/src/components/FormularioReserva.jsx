import { useState } from 'react';

// Formulario para reservar una plaza. Valida en el cliente antes de enviar.
// onReservar(datos) debe devolver una promesa: si falla, lanza un Error con el mensaje a mostrar.
function FormularioReserva({ onReservar }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [errorServidor, setErrorServidor] = useState('');
  const [reservado, setReservado] = useState(false);

  function validar() {
    const nuevos = {};
    if (nombre.trim().length < 2) nuevos.nombre = 'Escribe tu nombre (mínimo 2 letras).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nuevos.email = 'Revisa el correo, parece incompleto.';
    return nuevos;
  }

  async function enviar(evento) {
    evento.preventDefault();
    setErrorServidor('');
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    setEnviando(true);
    try {
      await onReservar({ name: nombre.trim(), email: email.trim() });
      setReservado(true);
    } catch (e) {
      setErrorServidor(e.message);
    } finally {
      setEnviando(false);
    }
  }

  if (reservado) {
    return <p role="status">Reserva registrada. Te esperamos en la charla.</p>;
  }

  return (
    <form onSubmit={enviar} noValidate>
      <div>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          aria-invalid={Boolean(errores.nombre)}
          aria-describedby={errores.nombre ? 'error-nombre' : undefined}
          disabled={enviando}
        />
        {errores.nombre && <p id="error-nombre" className="error">{errores.nombre}</p>}
      </div>

      <div>
        <label htmlFor="email">Correo</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(errores.email)}
          aria-describedby={errores.email ? 'error-email' : undefined}
          disabled={enviando}
        />
        {errores.email && <p id="error-email" className="error">{errores.email}</p>}
      </div>

      {errorServidor && <p className="error" role="alert">{errorServidor}</p>}

      <button type="submit" disabled={enviando}>
        {enviando ? 'Reservando…' : 'Reservar plaza'}
      </button>
    </form>
  );
}

export default FormularioReserva;
