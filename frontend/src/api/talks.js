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
