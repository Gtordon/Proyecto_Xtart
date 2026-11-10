// Llamadas al backend de SABITECH (Laravel). Todas las peticiones pasan por aquí.
const BASE_URL = 'http://127.0.0.1:8000/api';

// GET /api/talks → lista de charlas
export async function getCharlas() {
  const respuesta = await fetch(`${BASE_URL}/talks`);
  if (!respuesta.ok) throw new Error(`Error ${respuesta.status} al cargar las charlas`);
  return respuesta.json();
}

// GET /api/talks/{id} → detalle de una charla
export async function getCharla(id) {
  const respuesta = await fetch(`${BASE_URL}/talks/${id}`);
  if (!respuesta.ok) throw new Error(`Error ${respuesta.status} al cargar la charla`);
  return respuesta.json();
}

// Mensajes para cada código de error al reservar.
// PROVISIONALES: Joan los confirmará al terminar la ruta y quedarán en docs/api.md.
const ERRORES_RESERVA = {
  401: 'Tienes que iniciar sesión para reservar.',
  403: 'Tu usuario no puede reservar charlas.',
  404: 'Esta charla no existe o el servidor todavía no tiene la ruta de reservas.',
  409: 'Ya tienes esta reserva o no quedan plazas libres.',
  422: 'Ya tienes esta reserva o no quedan plazas libres.',
};

// POST /api/talks/{id}/reservations → reservar una plaza.
// Sin cuerpo: el servidor saca el usuario del token de la sesión (Sanctum).
export async function reservarPlaza(id, token) {
  const respuesta = await fetch(`${BASE_URL}/talks/${id}/reservations`, {
    method: 'POST',
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
  });
  if (respuesta.ok) return respuesta.status === 204 ? null : respuesta.json();
  throw new Error(ERRORES_RESERVA[respuesta.status] ?? `Error ${respuesta.status} al reservar.`);
}
