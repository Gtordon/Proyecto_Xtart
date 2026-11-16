// Piezas reutilizables de la interfaz: iconos, marca, avatar, plazas, mapa de asientos,
// vista previa del QR y un diálogo nativo con animación de entrada y salida.
import { useEffect, useRef } from 'react';
import { estadoPlazas, fichaFecha, iniciales, libresDe, plazas, tonoPersona } from '../utils/formato.js';

// ---- Iconos: un solo juego, trazo de 1,5 px, 16 px ----
const TRAZOS = {
  programa: <><rect x="2.5" y="3.5" width="11" height="10" rx="2" /><path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" /></>,
  entrada: <><path d="M2.5 5a1.5 1.5 0 0 0 0 3v0a1.5 1.5 0 0 1 0 3V12.5h11V11a1.5 1.5 0 0 1 0-3 1.5 1.5 0 0 0 0-3V3.5h-11z" /><path d="M9.5 4v1M9.5 7.5v1M9.5 11v1" /></>,
  entrar: <><path d="M9.5 2.5h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-3" /><path d="M6.5 5 9.5 8l-3 3M9.5 8H2.5" /></>,
  salir: <><path d="M6.5 2.5h-3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3" /><path d="M10.5 5l3 3-3 3M13.5 8h-7" /></>,
  menu: <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />,
  cerrar: <path d="M4 4l8 8M12 4l-8 8" />,
  atras: <path d="M9.5 3.5 5 8l4.5 4.5" />,
  enlace: <><path d="M7 9a3 3 0 0 0 4.24 0l2-2A3 3 0 0 0 9 2.76l-.6.6" /><path d="M9 7a3 3 0 0 0-4.24 0l-2 2A3 3 0 0 0 7 13.24l.6-.6" /></>,
  hecho: <path d="M3 8.5 6.5 12 13 4.5" />,
  externo: <><path d="M9.5 2.5h4v4M13.5 2.5 8 8" /><path d="M11.5 9.5v3a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3" /></>,
};

export function Icono({ nombre, tamano = 16 }) {
  return (
    <svg className="icono" width={tamano} height={tamano} viewBox="0 0 16 16" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {TRAZOS[nombre]}
    </svg>
  );
}

// ---- Marca: una entrada con su perforado, en el color de la marca ----
export function Marca() {
  return (
    <svg className="marca__simbolo" width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <path fill="var(--accent)" d="M5 5h18a2 2 0 0 1 2 2v4a3 3 0 0 0 0 6v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a3 3 0 0 0 0-6V7a2 2 0 0 1 2-2z" />
      <path stroke="var(--surface)" strokeWidth="2" strokeLinecap="round" strokeDasharray="0.1 4" d="M18 8.5v11" />
    </svg>
  );
}

// ---- Persona: iniciales sobre un tinte pálido propio ----
export function Avatar({ nombre, tamano = 24 }) {
  const tono = tonoPersona(nombre);
  return (
    <span className="avatar" aria-hidden="true"
      style={{ '--tono': tono, inlineSize: tamano, blockSize: tamano, fontSize: Math.round(tamano * 0.42) }}>
      {iniciales(nombre)}
    </span>
  );
}

// ---- Ficha de fecha (la "portada" de una charla o una entrada) ----
export function FichaFecha({ iso }) {
  const { dia, mes } = fichaFecha(iso);
  return (
    <span className="ficha-fecha" aria-hidden="true">
      <span className="ficha-fecha__dia">{dia}</span>
      <span className="ficha-fecha__mes">{mes}</span>
    </span>
  );
}

// ---- Plazas ----
export function PildoraPlazas({ libres, mia }) {
  if (mia) return <span className="pildora pildora--acento"><Icono nombre="hecho" tamano={12} />Tu plaza</span>;
  const { tono, texto } = estadoPlazas(libres);
  if (tono === 'libres') return null; // lo normal no lleva color
  return <span className={`pildora ${tono === 'completa' ? 'pildora--neutra' : 'pildora--aviso'}`}>{texto}</span>;
}

// Barra de ocupación: el relleno es lo reservado; cambia con una transición al reservar
export function BarraPlazas({ capacidad, libres }) {
  const ocupado = capacidad ? (capacidad - libres) / capacidad : 0;
  return (
    <span className="barra-plazas" role="img" aria-label={libresDe(libres, capacidad)}>
      <span className="barra-plazas__relleno" style={{ transform: `scaleX(${ocupado})` }} />
    </span>
  );
}

// Mapa de asientos: un cuadrado por plaza; el tuyo, en el color de la marca
export function MapaAsientos({ capacidad, libres, mia }) {
  const ocupadas = capacidad - libres;
  if (!capacidad || capacidad > 120) return <BarraPlazas capacidad={capacidad} libres={libres} />;
  return (
    <div className="asientos" role="img" style={{ '--columnas': Math.min(capacidad, 10) }}
      aria-label={`Aforo de ${plazas(capacidad)}: ${plazas(ocupadas)} ocupadas y ${plazas(libres)} libres`}>
      {Array.from({ length: capacidad }, (_, i) => {
        let tipo = i < ocupadas ? 'ocupado' : 'libre';
        if (mia && i === ocupadas - 1) tipo = 'mio';
        return <span key={i} className={`asiento asiento--${tipo}`} />;
      })}
    </div>
  );
}

// ---- Vista previa del QR (el real lo genera el servidor y cambia cada 30 s) ----
function patronQr(semilla, n) {
  let h = 0;
  for (const ch of semilla) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const enMarca = (x, y) => (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
  const puntos = [];
  for (let y = 0; y < n; y += 1) {
    for (let x = 0; x < n; x += 1) {
      h = (h * 1103515245 + 12345) >>> 0;
      if (!enMarca(x, y) && ((h >>> 16) & 1)) puntos.push([x, y]);
    }
  }
  return puntos;
}

export function QrVista({ semilla = 'RES', tamano = 96 }) {
  const n = 21;
  const marca = (x, y) => (
    <g key={`m${x}${y}`}>
      <rect x={x} y={y} width="7" height="7" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="var(--surface)" />
      <rect x={x + 2} y={y + 2} width="3" height="3" />
    </g>
  );
  return (
    <svg className="qr" viewBox={`-1 -1 ${n + 2} ${n + 2}`} width={tamano} height={tamano} aria-hidden="true">
      <rect x="-1" y="-1" width={n + 2} height={n + 2} fill="var(--surface)" />
      {patronQr(semilla, n).map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />)}
      {[marca(0, 0), marca(n - 7, 0), marca(0, n - 7)]}
    </svg>
  );
}

// ---- Diálogo nativo: foco atrapado y Esc gratis; la animación va en CSS (@starting-style) ----
export function Dialogo({ abierto, onCerrar, etiqueta, className = '', children }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (abierto && !d.open) {
      d.showModal();
      // El foco va al propio contenido (no al botón de cerrar): sin anillo de foco al abrir con el ratón
      d.querySelector('.dialogo__interior')?.focus();
    }
    if (!abierto && d.open) d.close();
  }, [abierto]);
  return (
    <dialog
      ref={ref}
      className={`dialogo ${className}`}
      aria-label={etiqueta}
      onClose={onCerrar}
      onClick={(e) => { if (e.target === e.currentTarget) onCerrar(); }}
    >
      {/* El contenido se mantiene al cerrar para que la salida se vea entera; el relleno va en un hijo,
          así un clic en el fondo (el propio <dialog>) se distingue de un clic dentro */}
      <div className="dialogo__interior" tabIndex={-1}>{children}</div>
    </dialog>
  );
}
