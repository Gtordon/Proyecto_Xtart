const charlas = [
  { id: 1, titulo: 'Introducción a la IA en el desarrollo', plazas: 30 },
  { id: 2, titulo: 'Seguridad en aplicaciones web', plazas: 20 },
  { id: 3, titulo: 'Diseño accesible para todos', plazas: 25 },
];

function App() {
  return (
    <main>
      <h1>SABITECH WEB</h1>
      <h2>Charlas</h2>
      <ul>
        {charlas.map((charla) => (
          <li key={charla.id}>
            {charla.titulo} · {charla.plazas} plazas libres
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;