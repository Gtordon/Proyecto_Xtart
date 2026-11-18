// Detalle de una charla: cabecera del objeto (fecha, título, datos y acciones), tres cifras,
// la descripción con el ponente y el aforo como mapa de asientos. Misma lógica de reserva que la web actual.
import { useEffect, useState, ViewTransition } from 'react';
import { Link, useParams } from 'react-router';
import { getCharla, reservarPlaza } from '../api/talks.js';
import { Avatar, FichaFecha, Icono, MapaAsientos, PildoraPlazas } from '../components/Piezas.jsx';
import { capital, dia, duracion, horario, libresDe, plazas } from '../utils/formato.js';

function TalkPage({ token, reservas, recargarReservas, onSesionInvalida }) {
  const { id } = useParams();
  const [charla, setCharla] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState(null); // { tipo: 'ok' | 'error', texto }
  const [recienReservada, setRecienReservada] = useState(false);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    let cancelado = false;
    setCargando(true);
    setErrorCarga('');
    getCharla(id)
      .then((datos) => !cancelado && setCharla(datos))
      .catch(() => !cancelado && setErrorCarga('No se ha podido cargar la charla.'))
      .finally(() => !cancelado && setCargando(false));
    return () => { cancelado = true; };
  }, [id]);

  const reserva = reservas.find((r) => r.status === 'confirmed' && String(r.talk?.id) === String(id));

  async function reservar() {
    setResultado(null);
    setEnviando(true);
    try {
      await reservarPlaza(charla.id, token);
      getCharla(charla.id).then(setCharla).catch(() => {});
      setRecienReservada(true);
      setResultado({ tipo: 'ok', texto: 'Plaza confirmada. Tu entrada ya está en Mis reservas.' });
      recargarReservas().catch(() => {});
    } catch (e) {
      if (e.code === 'unauthenticated') onSesionInvalida();
      if (e.code === 'talk_full') getCharla(charla.id).then(setCharla).catch(() => {});
      if (e.code === 'already_reserved') recargarReservas().catch(() => {});
      setResultado({ tipo: 'error', texto: e.message });
    } finally {
      setEnviando(false);
    }
  }

  async function copiarEnlace() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1600);
    } catch {
      // Sin permiso de portapapeles: no pasa nada
    }
  }

  if (cargando) return <div className="pagina"><p className="estado-lista">Cargando charla…</p></div>;
  if (errorCarga) {
    return (
      <div className="pagina">
        <Link to="/programa" className="volver"><Icono nombre="atras" />Programa</Link>
        <p className="mensaje mensaje--error" role="alert">{errorCarga}</p>
      </div>
    );
  }

  const completa = charla.available_seats === 0;
  const ocupadas = charla.capacity - charla.available_seats;

  let accion;
  if (reserva || recienReservada) {
    accion = <Link to="/mis-reservas" className="boton boton--secundario">Ver mi entrada</Link>;
  } else if (completa) {
    accion = <span className="fila__sin-accion">Sin plazas</span>;
  } else if (!token) {
    accion = <Link to="/login" state={{ volver: `/charlas/${charla.id}` }} className="boton boton--primario">Entrar para reservar</Link>;
  } else {
    accion = (
      <button type="button" className="boton boton--primario" onClick={reservar} disabled={enviando}>
        {enviando ? 'Reservando…' : 'Reservar plaza'}
      </button>
    );
  }

  return (
    <div className="pagina">
      <Link to="/programa" className="volver"><Icono nombre="atras" />Programa</Link>

      <header className="objeto tarjeta">
        <FichaFecha iso={charla.starts_at} />
        <div className="objeto__texto">
          <div className="objeto__fila">
            <ViewTransition name={`charla-${charla.id}`} share="vt-titulo">
              <h1 className="objeto__titulo">{charla.title}</h1>
            </ViewTransition>
            <button type="button" className="boton-icono" onClick={copiarEnlace}
              aria-label={copiado ? 'Enlace copiado' : 'Copiar enlace de la charla'}>
              <span className="icono-cambia" data-activo={copiado}>
                <Icono nombre="enlace" /><Icono nombre="hecho" />
              </span>
            </button>
          </div>
          <p className="objeto__meta">
            {capital(dia(charla.starts_at, true))} · {horario(charla.starts_at, charla.ends_at)} · {charla.room ?? 'Sala por confirmar'}
          </p>
        </div>
        <div className="objeto__acciones">{accion}</div>
      </header>

      {resultado && (
        <p className={`mensaje ${resultado.tipo === 'ok' ? 'mensaje--ok' : 'mensaje--error'}`}
          role={resultado.tipo === 'ok' ? 'status' : 'alert'}>
          {resultado.texto}
        </p>
      )}

      <div className="rejilla-6">
        <div className="cifra tarjeta">
          <p className="cifra__etiqueta">Plazas libres</p>
          <p className="cifra__valor">{charla.available_seats}</p>
        </div>
        <div className="cifra tarjeta">
          <p className="cifra__etiqueta">Reservadas</p>
          <p className="cifra__valor">{ocupadas}</p>
        </div>
        <div className="cifra tarjeta">
          <p className="cifra__etiqueta">Aforo</p>
          <p className="cifra__valor">{charla.capacity}</p>
        </div>

        <section className="tarjeta tarjeta--ancha" aria-labelledby="titulo-sobre">
          <h2 id="titulo-sobre" className="tarjeta__titulo">Sobre la charla</h2>
          <p className="descripcion">{charla.description ?? 'Descripción por confirmar.'}</p>
          <dl className="datos">
            <div><dt>Horario</dt><dd>{horario(charla.starts_at, charla.ends_at)}</dd></div>
            <div><dt>Duración</dt><dd>{duracion(charla.starts_at, charla.ends_at)}</dd></div>
            <div><dt>Sala</dt><dd>{charla.room ?? '—'}</dd></div>
            <div><dt>Aforo</dt><dd>{plazas(charla.capacity)}</dd></div>
          </dl>
          <div className="ponente">
            <Avatar nombre={charla.speaker ?? '?'} tamano={36} />
            <div>
              <p className="ponente__nombre">{charla.speaker ?? 'Por confirmar'}</p>
              <p className="ponente__rol">Ponente</p>
            </div>
          </div>
        </section>

        <section className="tarjeta tarjeta--lateral" aria-labelledby="titulo-aforo">
          <div className="tarjeta__cabecera">
            <h2 id="titulo-aforo" className="tarjeta__titulo">Aforo</h2>
            <PildoraPlazas libres={charla.available_seats} mia={Boolean(reserva || recienReservada)} />
          </div>
          <MapaAsientos capacidad={charla.capacity} libres={charla.available_seats} mia={recienReservada} />
          <ul className="leyenda">
            <li><span className="asiento asiento--libre" />Libre</li>
            <li><span className="asiento asiento--ocupado" />Ocupada</li>
            {recienReservada && <li><span className="asiento asiento--mio" />Tuya</li>}
          </ul>
          <p className="nota">{libresDe(charla.available_seats, charla.capacity)}. Las reservas canceladas liberan su plaza.</p>
        </section>
      </div>
    </div>
  );
}

export default TalkPage;
