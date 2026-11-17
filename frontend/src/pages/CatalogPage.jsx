// Programa (catálogo): la agenda del día con filtros por plazas y la reserva en la propia fila.
// Pregunta de la pantalla: "¿En qué charla me queda sitio?". Todo sale de GET /api/talks.
import { useState, ViewTransition } from 'react';
import { Link, useNavigate } from 'react-router';
import { getCharlas, reservarPlaza } from '../api/talks.js';
import { Avatar, BarraPlazas, PildoraPlazas } from '../components/Piezas.jsx';
import { capital, dia, enumerar, hora, plazas } from '../utils/formato.js';

const FILTROS = [
  { id: 'todas', texto: 'Todas', cumple: () => true },
  { id: 'libres', texto: 'Con plazas', cumple: (c) => c.available_seats > 5 },
  { id: 'pocas', texto: 'Últimas plazas', cumple: (c) => c.available_seats > 0 && c.available_seats <= 5 },
  { id: 'completas', texto: 'Completas', cumple: (c) => c.available_seats === 0 },
];

function FilaCharla({ charla, reserva, token, onReservada, onSesionInvalida, orden }) {
  const navigate = useNavigate();
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const completa = charla.available_seats === 0;

  async function reservar() {
    if (!token) {
      navigate('/login', { state: { volver: '/' } });
      return;
    }
    setError('');
    setEnviando(true);
    try {
      await reservarPlaza(charla.id, token);
      await onReservada(charla.id, true);
    } catch (e) {
      if (e.code === 'unauthenticated') onSesionInvalida();
      if (e.code === 'already_reserved') await onReservada(charla.id, false);
      else setError(e.message);
    } finally {
      setEnviando(false);
    }
  }

  let accion;
  if (reserva) {
    accion = <Link to="/mis-reservas" className="boton boton--secundario boton--pequeno">Ver entrada</Link>;
  } else if (completa) {
    accion = <span className="fila__sin-accion">Sin plazas</span>;
  } else {
    accion = (
      <button type="button" className="boton boton--primario boton--pequeno" onClick={reservar} disabled={enviando}
        aria-label={`Reservar plaza en ${charla.title}`}>
        {enviando ? 'Reservando…' : 'Reservar'}
      </button>
    );
  }

  return (
    <li className={`fila ${completa && !reserva ? 'fila--completa' : ''}`} style={{ '--orden': orden }}>
      <div className="fila__hora">
        <span className="fila__inicio">{hora(charla.starts_at)}</span>
        <span className="fila__fin">{hora(charla.ends_at)}</span>
      </div>

      <div className="fila__charla">
        <ViewTransition name={`charla-${charla.id}`} share="vt-titulo">
          <Link to={`/charlas/${charla.id}`} className="fila__titulo">{charla.title}</Link>
        </ViewTransition>
        <p className="fila__meta">
          <Avatar nombre={charla.speaker ?? '?'} tamano={20} />
          {charla.speaker ?? 'Ponente por confirmar'} · {charla.room ?? 'Sala por confirmar'}
        </p>
      </div>

      <div className="fila__plazas">
        <div className="fila__plazas-texto">
          <span><strong>{charla.available_seats}</strong> de {charla.capacity}</span>
          <PildoraPlazas libres={charla.available_seats} mia={Boolean(reserva)} />
        </div>
        <BarraPlazas capacidad={charla.capacity} libres={charla.available_seats} />
      </div>

      <div className="fila__accion">
        {accion}
        {error && <p className="fila__error" role="alert">{error}</p>}
      </div>
    </li>
  );
}

// Panel lateral: tu agenda si has entrado; si no, cómo se reserva. Debajo, el aforo total del día.
function Jornada({ token, charlas, confirmadas, libres, aforo, cargando }) {
  const mias = charlas.filter((c) => confirmadas.has(c.id));
  return (
    <aside className="tarjeta jornada" aria-labelledby="titulo-jornada">
      <h2 id="titulo-jornada" className="tarjeta__titulo">Tu jornada</h2>

      {token && mias.length > 0 && (
        <ol className="agenda">
          {mias.map((c) => (
            <li key={c.id}>
              <span className="agenda__hora">{hora(c.starts_at)}</span>
              <span className="agenda__texto">
                <Link to={`/charlas/${c.id}`}>{c.title}</Link>
                <span className="agenda__sala">{c.room} · {confirmadas.get(c.id).reference}</span>
              </span>
            </li>
          ))}
        </ol>
      )}
      {token && mias.length === 0 && (
        <p className="nota">Aún no tienes plaza en ninguna charla. Pulsa Reservar en la que te interese.</p>
      )}
      {!token && (
        <>
          <ol className="pasos">
            <li>Entra con tu cuenta de asistente.</li>
            <li>Pulsa Reservar en la charla que quieras.</li>
            <li>Enseña el QR de tu entrada en la puerta.</li>
          </ol>
          <Link to="/login" className="boton boton--secundario boton--ancho">Entrar</Link>
        </>
      )}

      <div className="jornada__aforo">
        <div className="fila__plazas-texto">
          <span>Plazas libres en todo el día</span>
          <span><strong>{cargando ? '—' : libres}</strong> de {cargando ? '—' : aforo}</span>
        </div>
        <BarraPlazas capacidad={aforo} libres={libres} />
      </div>
    </aside>
  );
}

function CatalogPage({ charlas, setCharlas, cargando, error, token, reservas, recargarReservas, onSesionInvalida }) {
  const [filtro, setFiltro] = useState('todas');
  // Mientras carga o si el backend no responde, las cifras se muestran con un guion
  const sinDatos = cargando || Boolean(error);

  const libres = charlas.reduce((s, c) => s + (c.available_seats ?? 0), 0);
  const aforo = charlas.reduce((s, c) => s + (c.capacity ?? 0), 0);
  const salas = [...new Set(charlas.map((c) => c.room).filter(Boolean))];
  const completas = charlas.filter((c) => c.available_seats === 0);
  const confirmadas = new Map(reservas.filter((r) => r.status === 'confirmed').map((r) => [r.talk?.id, r]));
  const visibles = charlas.filter(FILTROS.find((f) => f.id === filtro).cumple);

  // Tras reservar: baja una plaza en la fila y se recargan las reservas (para tener la referencia)
  async function alReservar(){
    const [datos] = await Promise.all([
      getCharlas().catch(() => null),
      recargarReservas().catch(() => {}),
    ]);
    if(datos) setCharlas(datos);
  }

  // Lo que más importa hoy, en una línea
  let hallazgo = '';
  if (!cargando && charlas.length > 0) {
    hallazgo = `Quedan ${plazas(libres)} de ${aforo}`;
    if (completas.length === 1) hallazgo += `; «${completas[0].title}» está completa.`;
    else if (completas.length > 1) hallazgo += `; ${completas.length} charlas están completas.`;
    else hallazgo += '.';
  }

  return (
    <div className="pagina">
      <header className="cabecera">
        <div>
          <h1 className="cabecera__titulo">Programa</h1>
          <p className="cabecera__sub">
            {charlas[0] ? `${capital(dia(charlas[0].starts_at, true))} · ${enumerar(salas)}` : 'Jornadas tecnológicas SABITECH'}
          </p>
        </div>
        {hallazgo && <p className="cabecera__hallazgo">{hallazgo}</p>}
      </header>

      <div className="filtros" role="group" aria-label="Filtrar por plazas">
        {FILTROS.map((f) => (
          <button key={f.id} type="button" className="filtro" aria-pressed={filtro === f.id} onClick={() => setFiltro(f.id)}>
            <span className="filtro__texto">{f.texto}</span>
            <span className="filtro__cifra">{sinDatos ? '—' : charlas.filter(f.cumple).length}</span>
          </button>
        ))}
      </div>

      <div className="programa__cuerpo">
      <section className="tarjeta" aria-label="Charlas">
        <div className="lista__cabecera" aria-hidden="true">
          <span>Hora</span>
          <span>Charla</span>
          <span>Plazas libres</span>
          <span />
        </div>

        {cargando && <p className="estado-lista">Cargando charlas…</p>}
        {error && <p className="mensaje mensaje--error" role="alert">{error}</p>}
        {!cargando && !error && visibles.length === 0 && (
          <p className="estado-lista">
            {charlas.length === 0 ? 'Todavía no hay charlas publicadas.' : 'Ninguna charla con este filtro.'}
          </p>
        )}

        <ul className="lista">
          {visibles.map((c, i) => (
            <FilaCharla key={c.id} charla={c} orden={i} token={token} reserva={confirmadas.get(c.id)} onReservada={alReservar} onSesionInvalida={onSesionInvalida} />
          ))}
        </ul>
      </section>

      <Jornada token={token} charlas={charlas} confirmadas={confirmadas} libres={libres} aforo={aforo} cargando={sinDatos} />
      </div>
    </div>
  );
}

export default CatalogPage;
