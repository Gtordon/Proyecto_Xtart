# Pruebas · checkpoint

Dos tipos de prueba: el recorrido de la demo en el navegador (apartado 1) y las peticiones a la API con **Thunder Client**, la extensión de VS Code (apartados 2 y 3). La columna "Esperado" sale del código del backend; "Obtenido" se rellena al hacer cada prueba, con su captura.

## Antes de probar

1. Base de datos limpia: en `backend`, `php artisan migrate:fresh --seed`.
2. Backend encendido: `php artisan serve` (queda en `http://127.0.0.1:8000`).
3. En Thunder Client, en todas las peticiones, cabecera `Accept: application/json`.
4. Para las rutas privadas, cabecera `Authorization: Bearer <token>`, con el token que devuelve el login.

Datos de partida del seeder (todas las contraseñas son `password`; los títulos van sin tildes porque así están en el seeder):

| Usuario | Perfil | Reservas al empezar |
|---|---|---|
| `ana@sabitech.test` | Asistente | RES-001 (Ciberseguridad) y RES-003 (Desarrollo de aplicaciones móviles) |
| `alex@sabitech.test` | Asistente | RES-002 (Desarrollo de aplicaciones móviles) |
| `carla@sabitech.test` | Asistente | Ninguna |
| `organizacion@sabitech.test` | Organización | — |
| `acceso@sabitech.test` | Personal de acceso | — |

| Charla | Aforo | Plazas libres al empezar |
|---|---|---|
| 1 · Introducción a la IA generativa | 100 | 100 |
| 2 · Ciberseguridad en aplicaciones web | 2 | 1 |
| 3 · Desarrollo de aplicaciones móviles | 2 | 0 (completa) |

## 1. Recorrido de la demo en el navegador

Hecho por Guillermo el 17/11/2026, después de `npm ci`, `npm run build` (sin errores) y `php artisan migrate:fresh --seed`. Capturas en `docs/capturas_pruebas/`.

| # | Prueba | Esperado | Resultado |
|---|---|---|---|
| 1 | Abrir el programa sin sesión | 3 charlas con 100, 1 y 0 plazas | Correcto |
| 2 | Entrar con `carla@sabitech.test` | Vuelve al programa con su nombre | Correcto |
| 3 | Reservar "Introducción a la IA generativa" | "Tu plaza" y 99 plazas | Correcto |
| 4 | Intentar reservarla otra vez | No deja; sale "Ver mi entrada" | Correcto |
| 5 | Mirar la charla completa | "Completa" y "Sin plazas", sin botón | Correcto |
| 6 | Ir a Mis reservas | La reserva aparece con su referencia | Correcto |
| 7 | Salir y volver a entrar con Carla | La reserva sigue ahí | Correcto |
| 8 | Reservar con `organizacion@sabitech.test` | "Solo los asistentes pueden reservar charlas." | Correcto |
| 9 | Vista de móvil (herramientas del navegador) | Menú lateral y sin scroll horizontal | Correcto |

## 2. Los 8 casos de la API (Thunder Client)

Hecho por Joan el 18/11/2026 con Thunder Client, después de `php artisan migrate:fresh --seed`. Los 8 casos dan lo esperado.

| # | Caso | Petición | Esperado | Obtenido | Captura |
|---|---|---|---|---|---|
| 1 | Login correcto | `POST /api/login` con `{"email":"carla@sabitech.test","password":"password"}` | 200 con `token` y `user` | 200 con `token` y `user` (Carla, `role: attendee`) | [api-01](capturas_pruebas/api-01-login.png) |
| 2 | Login con contraseña mal | `POST /api/login` con `{"email":"carla@sabitech.test","password":"incorrecta"}` | **401** con `code: invalid_credentials` | 401 con `code: invalid_credentials` | [api-02](capturas_pruebas/api-02-login-mal.png) |
| 3 | Reservar sin token | `POST /api/talks/1/reservations` sin `Authorization` | 401 con `code: unauthenticated` | 401 con `code: unauthenticated` | [api-03](capturas_pruebas/api-03-sin-token.png) |
| 4 | Reserva válida | `POST /api/talks/1/reservations` con el token de Carla | 201 con `id`, `talk_id` y `status: confirmed` | 201 con `id`, `talk_id: 1` y `status: confirmed` (sin `reference`, ver apartado 4) | [api-04](capturas_pruebas/api-04-reserva.png) |
| 5 | La misma reserva otra vez | Repetir la petición 4 | 409 con `code: already_reserved`, sin crear otra fila | 409 con `code: already_reserved` | [api-05](capturas_pruebas/api-05-repetida.png) |
| 6 | Reservar la charla completa | `POST /api/talks/3/reservations` con el token de Carla | 409 con `code: talk_full`, sin crear fila | 409 con `code: talk_full` | [api-06](capturas_pruebas/api-06-completa.png) |
| 7 | Reservar con el usuario de organización | Login de `organizacion@` y `POST /api/talks/1/reservations` con su token | 403 con `code: forbidden_role` | 403 con `code: forbidden_role` | [api-07](capturas_pruebas/api-07-organizacion.png) |
| 8 | Logout y pedir mis reservas con el token viejo | `POST /api/logout` con el token de Carla y después `GET /api/reservations` con el mismo token | 200 en el logout y **401** después | 200 (`Sesión cerrada.`) en el logout y 401 `unauthenticated` después | [api-08a](capturas_pruebas/api-08a-logout.png) · [api-08b](capturas_pruebas/api-08b-token-viejo.png) |

**Cómo comprobar que no se crean filas (casos 5 y 6):** `GET /api/reservations` con el token de Carla debe mostrar una sola reserva (la de la charla 1), y `GET /api/talks/3` debe seguir con 0 plazas libres.

## 3. Casos extra

Comprobados el 18/11/2026 con `curl` en una copia aparte del proyecto (rama `main`, base de datos de pruebas propia), con ayuda de IA; ver `registro-ia.md`. No tienen captura. Los 5 dan lo esperado.

| # | Caso | Petición | Esperado | Obtenido |
|---|---|---|---|---|
| 9 | Charla que no existe | `POST /api/talks/99/reservations` con el token de Carla | 404 con `code: talk_not_found` | 404 con `code: talk_not_found` |
| 10 | Correo sin formato | `POST /api/login` con `{"email":"carla","password":"password"}` | 422 (validación) | 422 con `code: validation_failed` (error en `email`) |
| 11 | Cada uno ve solo lo suyo | `GET /api/reservations` con el token de Alex | Solo RES-002, nunca las de Ana o Carla | 200 con una sola reserva: RES-002 |
| 12 | Plazas tras reservar | `GET /api/talks/1` después del caso 4 | 99 plazas libres | 200 con `available_seats: 99` |
| 13 | Charla que ya ha empezado | Cambiar en MySQL la hora de una charla al pasado (`UPDATE talks SET starts_at = NOW() - INTERVAL 1 HOUR, ends_at = NOW() WHERE id = 1;`) y reservarla | 409 con `code: talk_started` | 409 con `code: talk_started` |

Después del caso 13 hay que volver a ejecutar `php artisan migrate:fresh --seed`.

## 4. Diferencias con la guía, para comentarlas con Joan

- **Contraseña mal (caso 2):** la guía esperaba 422; el backend responde **401** con `invalid_credentials`. Las dos opciones son válidas, pero la memoria tiene que decir lo que hace de verdad.
- **Reserva válida (caso 4):** la guía esperaba "201 y una referencia". La respuesta trae `id`, `talk_id` y `status`, pero **no la referencia**; la referencia sale en `GET /api/reservations`. Si queréis cumplir la guía al pie de la letra, Joan puede añadir `reference` a la respuesta del `store` (una línea en `ReservationController`).
- **Dos personas a la vez por la última plaza:** lo evita `DB::transaction` con `lockForUpdate` en `ReservationService`. Con Thunder Client no se puede lanzar a la vez; queda para las pruebas automáticas de febrero.
