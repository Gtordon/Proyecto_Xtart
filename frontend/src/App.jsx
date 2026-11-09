import { useState } from 'react';

const CHARLAS_INICIALES = [
  { id: 1, titulo: 'Introducción a la IA en el desarrollo', plazas: 30, ponente: 'Ponente por confirmar' },
  { id: 2, titulo: 'Seguridad en aplicaciones web', plazas: 20, ponente: 'Ponente por confirmar' },
  { id: 3, titulo: 'Diseño accesible para todos', plazas: 25, ponente: 'Ponente por confirmar' },
];

function App() {
  // Estado: la lista de charlas y la charla que se está viendo
  const [charlas, setCharlas] = useState(CHARLAS_INICIALES);
  const [seleccionada, setSeleccionada] = useState(null);

  // Reservar: resta una plaza a la charla elegida, si quedan
  function reservar(id) {
    setCharlas(
      charlas.map((c) =>
        c.id === id && c.plazas > 0 ? { ...c, plazas: c.plazas - 1 } : c
      )
    );
  }

  // Si hay una charla seleccionada, mostramos su detalle
  const charla = charlas.find((c) => c.id === seleccionada);

  if (charla) {
    return (
      <main>
        <button onClick={() => setSeleccionada(null)}>← Volver</button>
        <h1>{charla.titulo}</h1>
        <p>Ponente: {charla.ponente}</p>
        <p>Plazas libres: {charla.plazas}</p>
        <button onClick={() => reservar(charla.id)} disabled={charla.plazas === 0}>
          {charla.plazas === 0 ? 'Completa' : 'Reservar plaza'}
        </button>
      </main>
    );
  }

  return (
    <main>
      <h1>SABITECH WEB</h1>
      <h2>Charlas</h2>
      <ul>
        {charlas.map((c) => (
          <li key={c.id}>
            <button onClick={() => setSeleccionada(c.id)}>{c.titulo}</button>
            {' '}· {c.plazas} plazas libres
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;