// Textos y fechas en español. Si falta un dato se muestra un guion.

export function dia(iso, largo = false) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-ES', largo
    ? { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    : { weekday: 'short', day: 'numeric', month: 'short' });
}

export function hora(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

export function horario(inicio, fin) {
  if (!inicio) return '—';
  return fin ? `${hora(inicio)} – ${hora(fin)}` : hora(inicio);
}

// "1 plaza" / "3 plazas"
export const plazas = (n) => `${n} ${n === 1 ? 'plaza' : 'plazas'}`;

// "1 plaza libre de 2" / "99 plazas libres de 100"
export const libresDe = (n, total) => `${n} ${n === 1 ? 'plaza libre' : 'plazas libres'} de ${total}`;

// "1 h" / "45 min" / "1 h 30 min"
export function duracion(inicio, fin) {
  if (!inicio || !fin) return '—';
  const min = Math.round((new Date(fin) - new Date(inicio)) / 60000);
  const h = Math.floor(min / 60);
  const resto = min % 60;
  if (!h) return `${resto} min`;
  return resto ? `${h} h ${resto} min` : `${h} h`;
}

// Estado de las plazas, siempre con texto (no solo color)
export function estadoPlazas(libres) {
  if (libres === 0) return { tono: 'completa', texto: 'Completa' };
  if (libres === 1) return { tono: 'pocas', texto: 'Última plaza' };
  if (libres <= 5) return { tono: 'pocas', texto: `Quedan ${libres}` };
  return { tono: 'libres', texto: `${plazas(libres)} libres` };
}

// Primera letra en mayúscula ("jueves, 19…" → "Jueves, 19…")
export const capital = (t) => t.charAt(0).toUpperCase() + t.slice(1);

// Lista natural: "Sala 1, Sala 2 y Sala 3"
export function enumerar(lista) {
  if (lista.length < 2) return lista.join('');
  return `${lista.slice(0, -1).join(', ')} y ${lista.at(-1)}`;
}

// Iniciales de una persona: "Laura Martín" → "LM"
export function iniciales(nombre = '') {
  return nombre.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('');
}

// Tono propio y estable para cada persona (identidad, no datos): tintes pálidos separados 60° o más
const TONOS = [25, 85, 145, 205, 330];
export function tonoPersona(nombre = '') {
  let h = 0;
  for (const ch of nombre) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TONOS[h % TONOS.length];
}

// Día del mes y mes corto para la ficha de fecha: { dia: '19', mes: 'nov' }
export function fichaFecha(iso) {
  if (!iso) return { dia: '—', mes: '' };
  const d = new Date(iso);
  return { dia: String(d.getDate()), mes: d.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '') };
}
