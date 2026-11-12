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

// Mensajes del frontend según el "code" que devuelve la API (contrato acordado con Joan).
// Se decide por "code" y no por el texto de "message" ni por el número: hay dos 409 distintos.
const MENSAJES_RESERVA = {
  unauthenticated: 'No has iniciado sesión o tu sesión ha caducado. Vuelve a entrar.',
  forbidden_role: 'Solo los asistentes pueden reservar charlas.',
  already_reserved: 'Ya tienes una reserva en esta charla.',
  talk_full: 'No quedan plazas libres en esta charla.',
  talk_started: 'Esta charla ya ha empezado.',
};

// Error de reserva con el "code" de la API, para que la aplicación reaccione (p. ej. cerrar sesión).
export class ErrorReserva extends Error {
  constructor(mensaje, code, status) {
    super(mensaje);
    this.code = code;
    this.status = status;
  }
}

// POST /api/talks/{id}/reservations → reservar una plaza.
// Autenticación por token de Sanctum (Authorization: Bearer), como fija el contrato de la API.
// Sin cuerpo: el servidor saca el usuario del token.
// 201 → {"id", "talk_id", "status"}. Errores → {"message", "code"}.
export async function reservarPlaza(id, token) {
  // Sin token no se llama a la API (así nunca se envía "Bearer null")
  if (!token) throw new ErrorReserva(MENSAJES_RESERVA.unauthenticated, 'unauthenticated', 401);

  const respuesta = await fetch(`${BASE_URL}/talks/${id}/reservations`, {
    method: 'POST',
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
  });
  if (respuesta.ok) return respuesta.json();

  let cuerpo = {};
  try {
    cuerpo = await respuesta.json();
  } catch {
    // Respuesta sin JSON: nos quedamos con el número de error
  }
  // Un 401 siempre es sesión no válida, aunque la respuesta no traiga "code"
  const code = cuerpo.code ?? (respuesta.status === 401 ? 'unauthenticated' : null);
  let mensaje = MENSAJES_RESERVA[code];
  if (!mensaje) mensaje = respuesta.status === 404 ? 'No se ha encontrado la charla.' : `Error ${respuesta.status} al reservar.`;
  throw new ErrorReserva(mensaje, code, respuesta.status);
}

// POST /api/login → inicia sesión con correo y contraseña.
// 200 → {"token", "user"}. Error → {"message", "code"} con code "invalid_credentials".
export async function iniciarSesion(email, password) {
  let respuesta;
  try {
    respuesta = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    // El servidor no responde (backend apagado)
    throw new Error('No se pudo conectar con el servidor. ¿Está encendido el backend?');
  }

  if (respuesta.ok) return respuesta.json();

  let cuerpo = {};
  try {
    cuerpo = await respuesta.json();
  } catch {
    // Respuesta sin JSON: nos quedamos con el número de error
  }
  throw new Error(cuerpo.message ?? `Error ${respuesta.status} al iniciar sesión.`);
}