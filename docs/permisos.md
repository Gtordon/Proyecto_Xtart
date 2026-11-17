# Permisos de SABITECH WEB

Cada ruta de la API comprueba en el **servidor** quién hace la petición y qué perfil tiene. El frontend esconde los botones que no tocan (por ejemplo, "Reservar" sin sesión), pero esa es solo una ayuda: la decisión final es siempre del backend.

## 1. Cómo se identifica al usuario

1. `POST /api/login` comprueba el correo y la contraseña (guardada cifrada con hash) y devuelve un **token**.
2. El servidor guarda solo el hash del token (`sha256`) y le pone una caducidad de **8 horas**.
3. El frontend envía el token en cada petición privada con la cabecera `Authorization: Bearer <token>`.
4. El middleware `auth.token` (`app/Http/Middleware/AuthenticateApiToken.php`) busca ese token. Si falta, no existe o ha caducado, responde **401** con `code: unauthenticated`.
5. `POST /api/logout` borra el token del usuario, así que el token viejo deja de valer.

## 2. Permisos por ruta

| Ruta | Visitante (sin sesión) | Asistente | Organización | Personal de acceso | Dónde se comprueba |
|---|---|---|---|---|---|
| `GET /api/talks` | Sí | Sí | Sí | Sí | Ruta pública |
| `GET /api/talks/{id}` | Sí | Sí | Sí | Sí | Ruta pública; 404 si no existe |
| `POST /api/login` | Sí | Sí | Sí | Sí | Máximo 10 intentos por minuto (429 si se pasa) |
| `POST /api/logout` | No (401) | Sí | Sí | Sí | Middleware `auth.token` |
| `GET /api/user` | No (401) | Sí | Sí | Sí | Middleware `auth.token` |
| `POST /api/talks/{id}/reservations` | No (401) | **Sí** | No (403) | No (403) | `auth.token` + `ReservationService` (solo el rol `attendee`) |
| `GET /api/reservations` | No (401) | Solo las suyas | Solo las suyas | Solo las suyas | `auth.token` + filtro por `user_id` en `ReservationController` |

## 3. Qué responde cuando no puede

| Situación | Código | `code` en la respuesta | Mensaje |
|---|---|---|---|
| Sin token, token inventado o caducado | 401 | `unauthenticated` | "No has iniciado sesión o tu sesión ha caducado." |
| Correo o contraseña incorrectos | 401 | `invalid_credentials` | "Correo o contraseña incorrectos." (no dice cuál de los dos falla) |
| Correo sin formato válido o campos vacíos | 422 | — | Error de validación de Laravel |
| Demasiados intentos de login | 429 | — | Límite de Laravel |
| Perfil que no es asistente intenta reservar | 403 | `forbidden_role` | "Solo los asistentes pueden reservar charlas." |

## 4. Para febrero

Las pantallas de **organización** (gestionar charlas y ver inscripciones y asistencias) y de **personal de acceso** (validar el QR en la puerta) aún no existen. Cuando se hagan, sus rutas irán dentro de `auth.token` y comprobarán el rol en el servidor, igual que la reserva: organización con `organizer` y personal de acceso con `access_staff`. Así, un asistente que cambie una dirección o una petición no podrá entrar en ellas.
