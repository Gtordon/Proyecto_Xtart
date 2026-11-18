// Mis reservas: tus entradas, con la próxima charla destacada en la cabecera.
// "Ver entrada" abre la entrada con su QR, lista para enseñarla en la puerta. Datos de GET /api/reservations.
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router';
import { Dialogo, FichaFecha, Icono, QrVista } from '../components/Piezas.jsx';
import { capital, dia, hora } from '../utils/formato.js';

function MyReservationsPage({ token, reservas, recargarReservas }) {
  // Si la app ya tiene las reservas (se cargan con el programa), se muestran sin esperar
  const [cargando, setCargando] = useState(reservas.length === 0);
  const [abierta, setAbierta] = useState(null); // reserva cuya entrada se muestra
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    setError('');
    recargarReservas()
      .catch((e) => {
        if (e.status !== 401) setError('No se pudieron cargar tus reservas. ¿Está encendido el backend?');
      })
      .finally(() => setCargando(false));
  }, [token, recargarReservas]);

  if (!token) return <Navigate to="/login" replace state={{ volver: '/mis-reservas' }} />;

  const confirmadas = reservas.filter((r) => r.status === 'confirmed');
  const canceladas = reservas.length - confirmadas.length;
  const proxima = [...confirmadas]
    .filter((r) => r.talk?.starts_at)
    .sort((a, b) => new Date(a.talk.starts_at) - new Date(b.talk.starts_at))[0];

  function abrir(r) {
    setAbierta(r);
    setVisible(true);
  }

  return (
    <div className="pagina">
      <header className="cabecera">
        <div>
          <h1 className="cabecera__titulo">Mis reservas</h1>
          <p className="cabecera__sub">
            {cargando ? 'Cargando…' : `${confirmadas.length} ${confirmadas.length === 1 ? 'confirmada' : 'confirmadas'} · ${canceladas} ${canceladas === 1 ? 'cancelada' : 'canceladas'}`}
          </p>
        </div>
        {proxima && (
          <p className="cabecera__hallazgo">
            Tu próxima charla: «{proxima.talk.title}», {dia(proxima.talk.starts_at)} a las {hora(proxima.talk.starts_at)} en {proxima.talk.room}.
          </p>
        )}
      </header>

      {error && <p className="mensaje mensaje--error" role="alert">{error}</p>}

      {!cargando && !error && reservas.length === 0 && (
        <div className="tarjeta vacio">
          <p className="vacio__titulo">Todavía no tienes plazas reservadas</p>
          <p className="nota">Elige una charla del programa y pulsa Reservar.</p>
          <Link to="/programa" className="boton boton--primario">Ver el programa</Link>
        </div>
      )}

      {reservas.length > 0 && (
        <section className="tarjeta" aria-label="Tus entradas">
          <ul className="lista">
            {reservas.map((r, i) => {
              const confirmada = r.status === 'confirmed';
              return (
                <li key={r.id} className={`fila fila--entrada ${confirmada ? '' : 'fila--cancelada'}`} style={{ '--orden': i }}>
                  <FichaFecha iso={r.talk?.starts_at} />
                  <div className="fila__charla">
                    {r.talk?.id
                      ? <Link to={`/charlas/${r.talk.id}`} className="fila__titulo">{r.talk.title}</Link>
                      : <span className="fila__titulo">{r.talk?.title ?? 'Charla'}</span>}
                    <p className="fila__meta">
                      {r.talk?.starts_at ? `${capital(dia(r.talk.starts_at))} · ${hora(r.talk.starts_at)}` : 'Fecha por confirmar'} · {r.talk?.room ?? '—'}
                    </p>
                  </div>
                  <span className="referencia">{r.reference}</span>
                  <span className={`pildora ${confirmada ? 'pildora--positiva' : 'pildora--neutra'}`}>
                    {confirmada ? 'Confirmada' : 'Cancelada'}
                  </span>
                  <div className="fila__accion">
                    {confirmada
                      ? <button type="button" className="boton boton--secundario boton--pequeno" onClick={() => abrir(r)}>Ver entrada</button>
                      : <span className="fila__sin-accion">Plaza liberada</span>}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <Dialogo abierto={visible} onCerrar={() => setVisible(false)} etiqueta="Tu entrada" className="dialogo--entrada">
        {abierta && (
          <div className="entrada">
            <button type="button" className="boton-icono entrada__cerrar" onClick={() => setVisible(false)} aria-label="Cerrar">
              <Icono nombre="cerrar" />
            </button>
            <p className="entrada__etiqueta">Entrada · {abierta.reference}</p>
            <h2 className="entrada__titulo">{abierta.talk?.title}</h2>
            <p className="entrada__meta">
              {capital(dia(abierta.talk?.starts_at, true))} · {hora(abierta.talk?.starts_at)} · {abierta.talk?.room}
            </p>
            <div className="entrada__qr"><QrVista semilla={abierta.reference} tamano={208} /></div>
            <p className="nota nota--centro">
              Vista previa. El QR real lo genera el servidor, cambia cada 30 segundos y se puede validar desde 30 minutos antes de la charla.
            </p>
          </div>
        )}
      </Dialogo>
    </div>
  );
}

export default MyReservationsPage;
