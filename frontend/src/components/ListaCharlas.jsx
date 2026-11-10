// Lista de charlas: solo pinta lo que recibe; los datos llegan desde App.jsx
function ListaCharlas({ charlas, onElegir }) {
  return (
    <ul>
      {charlas.map((charla) => (
        <li key={charla.id}>
          <button onClick={() => onElegir(charla.id)}>{charla.title}</button>
          {' '}· {charla.available_seats} plazas libres
        </li>
      ))}
    </ul>
  );
}

export default ListaCharlas;
