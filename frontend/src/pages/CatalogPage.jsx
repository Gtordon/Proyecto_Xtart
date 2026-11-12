import { useNavigate } from 'react-router';
import ListaCharlas from '../components/ListaCharlas.jsx';

function CatalogPage({ charlas, cargando, error }) {
  const navigate = useNavigate();

  return (
    <main>
      <h1>SABITECH WEB</h1>
      <h2>Charlas</h2>

      {cargando && <p>Cargando charlas…</p>}
      {error && <p className="error">{error}</p>}
      {!cargando && !error && charlas.length === 0 && <p>Todavía no hay charlas.</p>}
      {!cargando && !error && charlas.length > 0 && (
        <ListaCharlas charlas={charlas} onElegir={(id) => navigate(`/charlas/${id}`)} />
      )}
    </main>
  );
}

export default CatalogPage;