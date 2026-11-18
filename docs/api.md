# Contrato de la API

Base: `http://127.0.0.1:8000/api`. Todas las respuestas son JSON.

## Autenticación

La API usa un token propio (no Sanctum). `POST /api/login` devuelve un `token`; el frontend lo envía en cada petición protegida con la cabecera:

```
Authorization: Bearer <token>
```

En la base de datos solo se guarda el hash SHA-256 del token. Caduca a las 8 horas y `POST /api/logout` lo invalida. Las rutas protegidas usan el middleware `auth.token` (`App\Http\Middleware\AuthenticateApiToken`).

## Formato de los errores

Los errores definidos por la API incluyen `message` y `code`. El frontend decide el texto que enseña a partir de `code`.

```json
{ "message": "No quedan plazas libres en esta charla.", "code": "talk_full" }
```

Los errores de validación añaden `errors` con el detalle por campo. Con `APP_DEBUG=false` no se devuelven trazas, rutas de archivos ni consultas SQL. Las respuestas generadas por Laravel, como el `429` del límite de intentos, pueden tener otro formato. Para la demostración se usa `APP_DEBUG=false`.

## Operaciones

| Método | Ruta | Descripción | Perfil |
|---|---|---|---|
| GET | `/talks` | Listado de charlas con plazas libres | Público |
| GET | `/talks/{id}` | Detalle de una charla | Público |
| POST | `/login` | Iniciar sesión | Público (máx. 10 intentos por minuto) |
| POST | `/logout` | Cerrar sesión | Autenticado |
| GET | `/user` | Datos del usuario de la sesión | Autenticado |
| POST | `/talks/{id}/reservations` | Reservar una plaza | Asistente |
| GET | `/reservations` | Reservas del usuario de la sesión | Autenticado |

### GET /talks

Respuesta `200`, ordenada por hora de inicio:

```json
[
  {
    "id": 1,
    "title": "Introducción a la IA generativa",
    "description": "Que son los modelos de lenguaje y que usos reales tienen en una empresa",
    "speaker": "Laura Martín",
    "starts_at": "2026-11-23T09:00:00.000000Z",
    "ends_at": "2026-11-23T10:00:00.000000Z",
    "room": "Sala 1",
    "capacity": 100,
    "available_seats": 100
  }
]
```

Las fechas van en ISO 8601 en UTC. El backend trabaja en `Europe/Madrid`, así que una charla a las 10:00 en Madrid se envía como `09:00Z` (o `08:00Z` en horario de verano). El frontend muestra la hora en la zona horaria del navegador. Si está configurado en `Europe/Madrid`, la charla se muestra a las 10:00. `available_seats` = aforo − reservas confirmadas; las canceladas no ocupan plaza.

### GET /talks/{id}

Respuesta `200` con el mismo formato que un elemento del listado.

| Código HTTP | `code` | Cuándo |
|---|---|---|
| 404 | `not_found` | La charla no existe |

### POST /login

Entrada:

```json
{ "email": "ana@sabitech.test", "password": "password" }
```

Respuesta `200`:

```json
{
  "token": "…60 caracteres…",
  "user": { "id": 1, "name": "Ana Asistente", "email": "ana@sabitech.test", "role": "attendee" }
}
```

| Código HTTP | `code` | Cuándo |
|---|---|---|
| 401 | `invalid_credentials` | Correo o contraseña incorrectos |
| 422 | `validation_failed` | Falta el correo, no tiene formato de correo o falta la contraseña |
| 429 | — | Más de 10 intentos en un minuto |

### POST /logout

Respuesta `200`: `{ "message": "Sesión cerrada." }`. El token deja de valer.

### GET /user

La respuesta `200` incluye los campos `id`, `name`, `email` y `role`. `role` es `attendee`, `organizer` o `access_staff`.

### POST /talks/{id}/reservations

Sin cuerpo. Respuesta `201`:

```json
{ "id": 7, "talk_id": 1, "status": "confirmed" }
```

Se hace dentro de una transacción que bloquea la fila de la charla (`lockForUpdate`), de modo que dos peticiones simultáneas no pueden ocupar la misma última plaza. Si el usuario tenía una reserva cancelada en esa charla, se reactiva la misma fila.

| Código HTTP | `code` | Cuándo |
|---|---|---|
| 401 | `unauthenticated` | Sin token, token incorrecto o caducado |
| 403 | `forbidden_role` | El usuario no es asistente |
| 404 | `talk_not_found` | La charla no existe |
| 409 | `talk_started` | La charla ya ha empezado |
| 409 | `already_reserved` | El usuario ya tiene una reserva confirmada en esa charla |
| 409 | `talk_full` | No quedan plazas |

### GET /reservations

Respuesta `200`, de la más reciente a la más antigua:

```json
[
  {
    "id": 1,
    "reference": "RES-001",
    "status": "confirmed",
    "talk": { "id": 2, "title": "Ciberseguridad en aplicaciones web", "starts_at": "…", "room": "Sala 2" }
  }
]
```

## Errores generales

| Código HTTP | `code` | Mensaje |
|---|---|---|
| 401 | `unauthenticated` | No has iniciado sesión o tu sesión ha caducado. |
| 403 | `forbidden` | No tienes permiso para esta operación. |
| 404 | `not_found` | No se ha encontrado el recurso. |
| 422 | `validation_failed` | Los datos enviados no son válidos. |

## Pruebas

Las pruebas automáticas están en `backend/tests/Feature` (`AutenticacionTest`, `CharlasTest`, `ReservasTest`) y cubren el login (200, 401 y 422), el logout, `GET /user`, las rutas protegidas sin token (401), el listado y el detalle de charlas (incluido el 404 y la hora de Madrid), la reserva (201, `already_reserved`, `talk_full`, `talk_started`, `talk_not_found`, `forbidden_role` y 401), la reactivación de una reserva cancelada y que Mis reservas solo devuelve las del usuario. Todavía no tienen prueba automática el límite de intentos (429) ni el error general `forbidden`. Se ejecutan con `php artisan test` desde `backend/`. El flujo de GitHub Actions está configurado para ejecutarlas en cada pull request y en cada push a `main`.
