// Inicio: la portada de las jornadas. Presenta SABITECH, las ventajas de reservar en la web,
// las charlas y ponentes del día, cómo funciona y las preguntas frecuentes.
// Los datos de charlas, ponentes, salas y plazas salen de GET /api/talks; el resto es texto fijo.
import { Link } from 'react-router';
import { Avatar, Icono } from '../components/Piezas.jsx';
import { capital, dia, enumerar, hora, plazas } from '../utils/formato.js';

const VENTAJAS = [
  { icono: 'reloj', titulo: 'Reserva en un momento', texto: 'Entras con tu cuenta, eliges la charla y pulsas «Reservar». Sin formularios ni correos de ida y vuelta.' },
  { icono: 'aforo', titulo: 'Plazas siempre al día', texto: 'Las plazas libres se calculan en el servidor en cada consulta, así que lo que ves es lo que queda de verdad.' },
  { icono: 'entrada', titulo: 'Tu entrada en el móvil', texto: 'Cada reserva tiene su referencia en «Mis reservas». En febrero llegará el QR para validar la entrada en la puerta.' },
];

export const PREGUNTAS = [
  { p: '¿Cuánto cuesta asistir?', r: 'Nada. Las jornadas son gratuitas; solo hace falta reservar plaza porque el aforo de cada sala es limitado.' },
  { p: '¿Cómo consigo una cuenta?', r: 'No hay registro público: las cuentas de asistente las crea la organización de las jornadas.' },
  { p: '¿Puedo reservar varias charlas?', r: 'Sí, una plaza en cada charla que quieras. Lo que no se puede es reservar dos veces la misma.' },
  { p: '¿Qué pasa si una charla está completa?', r: 'Aparece como «Sin plazas» y no se puede reservar. Si alguien cancela, la plaza vuelve a quedar libre.' },
  { p: '¿Hasta cuándo puedo reservar?', r: 'Hasta que empieza la charla. Una vez empezada ya no admite reservas.' },
];

function HomePage({ charlas, cargando, error, token }) {
  const salas = [...new Set(charlas.map((c) => c.room).filter(Boolean))];
  const ponentes = [...new Set(charlas.map((c) => c.speaker).filter(Boolean))];
  const libres = charlas.reduce((s, c) => s + (c.available_seats ?? 0), 0);
  const fecha = charlas[0] ? capital(dia(charlas[0].starts_at, true)) : 'Jornadas tecnológicas';
  const sinDatos = cargando || Boolean(error);
  const cifra = (n) => (sinDatos ? '—' : n);

  return (
    <div className="pagina">
      <section className="portada">
        <p className="portada__antetitulo">{fecha}{salas.length > 0 && ` · ${enumerar(salas)}`}</p>
        <h1 className="portada__titulo">Jornadas tecnológicas SABITECH</h1>
        <p className="portada__texto">
          Un día de charlas sobre inteligencia artificial, ciberseguridad y desarrollo de aplicaciones.
          Consulta el programa y reserva tu plaza desde la web.
        </p>
        <div className="portada__acciones">
          <Link to="/programa" className="boton boton--primario">Ver el programa</Link>
          {token
            ? <Link to="/mis-reservas" className="boton boton--claro">Mis reservas</Link>
            : <Link to="/login" className="boton boton--claro">Entrar para reservar</Link>}
        </div>
        <dl className="portada__cifras">
          <div><dt>Charlas</dt><dd>{cifra(charlas.length)}</dd></div>
          <div><dt>Ponentes</dt><dd>{cifra(ponentes.length)}</dd></div>
          <div><dt>Salas</dt><dd>{cifra(salas.length)}</dd></div>
          <div><dt>Plazas libres</dt><dd>{cifra(libres)}</dd></div>
        </dl>
      </section>

      {error && <p className="mensaje mensaje--error" role="alert">{error}</p>}

      <section className="seccion" aria-labelledby="ventajas">
        <h2 id="ventajas" className="seccion__titulo">Por qué reservar aquí</h2>
        <ul className="rejilla rejilla--3">
          {VENTAJAS.map((v) => (
            <li key={v.titulo} className="tarjeta bloque">
              <span className="bloque__icono"><Icono nombre={v.icono} tamano={20} /></span>
              <h3 className="bloque__titulo">{v.titulo}</h3>
              <p className="bloque__texto">{v.texto}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="seccion" aria-labelledby="charlas">
        <div className="seccion__cabecera">
          <h2 id="charlas" className="seccion__titulo">Las charlas</h2>
          <Link to="/programa" className="enlace-flecha">Programa completo <Icono nombre="siguiente" tamano={14} /></Link>
        </div>
        {cargando && <p className="estado-lista">Cargando charlas…</p>}
        <ul className="rejilla rejilla--3">
          {charlas.map((c) => (
            <li key={c.id}>
              <Link to={`/charlas/${c.id}`} className="tarjeta charla-tarjeta">
                <span className="charla-tarjeta__hora">{hora(c.starts_at)} – {hora(c.ends_at)} · {c.room}</span>
                <span className="charla-tarjeta__titulo">{c.title}</span>
                <span className="charla-tarjeta__ponente"><Avatar nombre={c.speaker} tamano={22} />{c.speaker}</span>
                <span className={`pildora ${c.available_seats === 0 ? 'pildora--neutra' : 'pildora--acento'}`}>
                  {c.available_seats === 0 ? 'Sin plazas' : `${plazas(c.available_seats)} ${c.available_seats === 1 ? 'libre' : 'libres'}`}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="seccion" aria-labelledby="ponentes">
        <div className="seccion__cabecera">
          <h2 id="ponentes" className="seccion__titulo">Ponentes</h2>
          <Link to="/ponentes" className="enlace-flecha">Ver ponentes <Icono nombre="siguiente" tamano={14} /></Link>
        </div>
        <ul className="ponentes-fila">
          {ponentes.map((nombre) => (
            <li key={nombre} className="ponentes-fila__item"><Avatar nombre={nombre} tamano={40} /><span>{nombre}</span></li>
          ))}
        </ul>
      </section>

      <section className="seccion seccion--dos" aria-labelledby="como">
        <div className="tarjeta bloque">
          <h2 id="como" className="seccion__titulo">Cómo funciona</h2>
          <ol className="pasos">
            <li>Entra con la cuenta que te ha dado la organización.</li>
            <li>Elige una charla en el programa y pulsa «Reservar».</li>
            <li>Consulta tu entrada y su referencia en «Mis reservas».</li>
            <li>El día de las jornadas, enséñala en la puerta de la sala.</li>
          </ol>
        </div>
        <div className="tarjeta bloque">
          <h2 className="seccion__titulo">Preguntas frecuentes</h2>
          <div className="faq">
            {PREGUNTAS.slice(0, 3).map((q) => (
              <details key={q.p} className="faq__item">
                <summary>{q.p}</summary>
                <p>{q.r}</p>
              </details>
            ))}
          </div>
          <Link to="/informacion" className="enlace-flecha">Más información <Icono nombre="siguiente" tamano={14} /></Link>
        </div>
      </section>

      <section className="aviso-final">
        <div>
          <h2 className="aviso-final__titulo">¿Te apuntas?</h2>
          <p>Las plazas de cada sala son limitadas. Reserva cuanto antes la charla que te interese.</p>
        </div>
        <Link to="/programa" className="boton boton--primario">Reservar plaza</Link>
      </section>
    </div>
  );
}

export default HomePage;
