// Ponentes: quién da cada charla, con su horario y sala. Sale de GET /api/talks.
import { Link } from 'react-router';
import { Avatar } from '../components/Piezas.jsx';
import { capital, dia, horario } from '../utils/formato.js';

function SpeakersPage({ charlas, cargando, error }) {
  // Un ponente puede dar varias charlas: se agrupan por nombre
  const porPonente = new Map();
  for (const c of charlas) {
    if (!c.speaker) continue;
    if (!porPonente.has(c.speaker)) porPonente.set(c.speaker, []);
    porPonente.get(c.speaker).push(c);
  }

  return (
    <div className="pagina">
      <header className="cabecera">
        <div>
          <h1 className="cabecera__titulo">Ponentes</h1>
          <p className="cabecera__sub">Las personas que dan las charlas de esta edición.</p>
        </div>
      </header>

      {cargando && <p className="estado-lista">Cargando ponentes…</p>}
      {error && <p className="mensaje mensaje--error" role="alert">{error}</p>}

      <ul className="rejilla rejilla--3">
        {[...porPonente].map(([nombre, suyas]) => (
          <li key={nombre} className="tarjeta ponente-tarjeta">
            <Avatar nombre={nombre} tamano={56} />
            <h2 className="ponente-tarjeta__nombre">{nombre}</h2>
            <ul className="ponente-tarjeta__charlas">
              {suyas.map((c) => (
                <li key={c.id}>
                  <Link to={`/charlas/${c.id}`} className="ponente-tarjeta__charla">{c.title}</Link>
                  <span className="ponente-tarjeta__cuando">{capital(dia(c.starts_at))} · {horario(c.starts_at, c.ends_at)} · {c.room}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpeakersPage;
