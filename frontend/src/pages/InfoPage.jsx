// Información: qué son las jornadas, quién las organiza, cómo llegar, contacto y preguntas frecuentes.
import { Link } from 'react-router';
import { PREGUNTAS } from './HomePage.jsx';
import { Icono } from '../components/Piezas.jsx';
import { capital, dia, enumerar } from '../utils/formato.js';

function InfoPage({ charlas }) {
  const salas = [...new Set(charlas.map((c) => c.room).filter(Boolean))];
  const fecha = charlas[0] ? capital(dia(charlas[0].starts_at, true)) : '—';

  return (
    <div className="pagina">
      <header className="cabecera">
        <div>
          <h1 className="cabecera__titulo">Información</h1>
          <p className="cabecera__sub">Todo lo que necesitas saber antes de venir.</p>
        </div>
      </header>

      <section className="seccion seccion--dos">
        <div className="tarjeta bloque">
          <h2 className="seccion__titulo">Sobre las jornadas</h2>
          <p className="bloque__texto">
            SABITECH organiza unas jornadas tecnológicas con charlas cortas sobre temas que ya están cambiando el trabajo
            en las empresas: inteligencia artificial, ciberseguridad y desarrollo de aplicaciones. Cada charla tiene
            una sala y un aforo, y para asistir hay que reservar plaza en esta web.
          </p>
        </div>
        <div className="tarjeta bloque">
          <h2 className="seccion__titulo">Cuándo y dónde</h2>
          <dl className="datos">
            <div><dt>Fecha</dt><dd>{fecha}</dd></div>
            <div><dt>Salas</dt><dd>{salas.length ? enumerar(salas) : '—'}</dd></div>
            <div><dt>Precio</dt><dd>Gratuito, con reserva</dd></div>
            <div><dt>Programa</dt><dd><Link to="/programa">Ver horarios</Link></dd></div>
            <div><dt>Lugar</dt><dd>Madrid (ubicación de ejemplo)</dd></div>
          </dl>
          <iframe
            className="mapa"
            title="Mapa de la ubicación de las jornadas"
            src="https://www.google.com/maps?q=Puerta+del+Sol,+Madrid&z=15&output=embed"
            loading="lazy"
          />
          <a className="enlace-flecha" href="https://www.google.com/maps?q=Puerta+del+Sol,+Madrid" target="_blank" rel="noreferrer">
            Abrir en Google Maps <Icono nombre="externo" tamano={14} />
          </a>
        </div>
      </section>

      <section className="seccion seccion--dos">
        <div className="tarjeta bloque">
          <h2 className="seccion__titulo">Contacto</h2>
          <p className="bloque__texto">
            Para pedir una cuenta de asistente o resolver cualquier duda sobre tu reserva, escribe a la organización
            de SABITECH. Para dudas sobre la web, a Umbral Labs, la empresa que la desarrolla.
          </p>
          <dl className="datos">
            <div><dt>Organización</dt><dd>organizacion@sabitech.test</dd></div>
            <div><dt>Web</dt><dd>Umbral Labs SL</dd></div>
          </dl>
          <p className="nota">Direcciones de ejemplo del proyecto: no envían correos reales.</p>
        </div>
        <div className="tarjeta bloque">
          <h2 className="seccion__titulo">Preguntas frecuentes</h2>
          <div className="faq">
            {PREGUNTAS.map((q) => (
              <details key={q.p} className="faq__item">
                <summary>{q.p}</summary>
                <p>{q.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default InfoPage;
