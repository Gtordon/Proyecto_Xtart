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

// POST /api/talks/{id}/reservations → reservar una plaza.
// La ruta todavía no está confirmada con el backend: si cambia, se cambia aquí.
export async function reservarPlaza(id, datos) {
  const respuesta = await fetch(`${BASE_URL}/talks/${id}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(datos),
  });
  if (respuesta.ok) return respuesta.json();
  if (respuesta.status === 422) throw new Error('El servidor no acepta los datos. Revisa el formulario.');
  if (respuesta.status === 409) throw new Error('Ya no quedan plazas libres en esta charla.');
  if (respuesta.status === 404) throw new Error('El servidor todavía no tiene la ruta de reservas.');
  throw new Error(`Error ${respuesta.status} al reservar.`);
}
