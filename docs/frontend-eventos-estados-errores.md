# Eventos, estados y errores del frontend (memoria, apartado 5)

> Fuente: código de `frontend/src` en la rama `main`, revisado el 2026-11-17. Todo lo que aparece aquí existe en el código; no se describe nada que no esté implementado.
> Tecnología: React con Vite y react-router. La sesión se guarda en `localStorage` con la clave `sabitech_token` y todas las llamadas al servidor están en `src/api/talks.js`.

## 1. Eventos que maneja la aplicación

| Evento | Dónde ocurre | Qué hace el frontend | Llamada a la API |
|---|---|---|---|
| Enviar el formulario de entrada | `LoginPage` | Valida en el navegador (el correo debe tener @ y la contraseña no puede estar vacía). Si es correcto, guarda el token y vuelve a la pantalla de la que venía | `POST /api/login` |
| Pulsar «Reservar» en una fila del programa | `CatalogPage` | Sin sesión, lleva al login y vuelve al programa después. Con sesión, reserva; si sale bien, vuelve a pedir las charlas al servidor y recarga las reservas | `POST /api/talks/{id}/reservations` |
| Pulsar «Reservar plaza» en el detalle | `TalkPage` | Igual que en el programa; además muestra un mensaje de confirmación y cambia el botón por «Ver mi entrada» | `POST /api/talks/{id}/reservations` |
| Pulsar «Ver entrada» | `MyReservationsPage` | Abre un diálogo con la referencia y una vista previa del QR | — |
| Pulsar «Salir» | Navegación lateral | Invalida el token en el servidor y después lo borra del navegador | `POST /api/logout` |
| Cambiar de filtro (Todas, Con plazas, Últimas plazas, Completas) | `CatalogPage` | Filtra la lista de charlas por plazas libres | — |
| Pulsar «Copiar enlace de la charla» | `TalkPage` | Copia la dirección al portapapeles y lo confirma durante un momento | — |
| Abrir o cerrar el menú | Barra móvil | Muestra u oculta el menú de navegación en pantallas pequeñas | — |
| Entrar en Inicio, Programa, Ponentes o Información | `App` | Pide otra vez las charlas y las reservas, para que las plazas estén al día | `GET /api/talks`, `GET /api/reservations` |
| Abrir una pregunta frecuente | `HomePage`, `InfoPage` | Despliega la respuesta (elemento `<details>`, sin JavaScript) | — |
| Pulsar un enlace legal del pie | `LegalPage` | Abre `/legal` y baja hasta el apartado (aviso legal, privacidad o cookies) | — |
| Cambiar de pantalla | `App` | Vuelve arriba del todo, con transición suave | — |
| Cambiar la sesión en otra pestaña (evento `storage`) | `App` | Actualiza el token de esta pestaña | — |
| Cargar un usuario con sesión | `App` | Pide quién es el usuario para mostrar su nombre y su rol | `GET /api/user` |

## 2. Estados de cada pantalla

**Programa (`CatalogPage`)**
- **Cargando:** «Cargando charlas…».
- **Error de conexión:** mensaje de error, con las cifras del resumen sustituidas por un guion.
- **Vacío:** «Todavía no hay charlas publicadas.», o «Ninguna charla con este filtro.» si hay charlas pero el filtro no encaja.
- **Con datos:** lista de charlas con hora, ponente, sala y plazas libres.
- **Por fila:** reservando («Reservando…»), con reserva propia («Ver entrada»), sin plazas («Sin plazas») o con un error en la propia fila.

**Detalle de la charla (`TalkPage`)**
- **Cargando:** «Cargando charla…».
- **Error de carga:** «No se ha podido cargar la charla.».
- **Sin sesión:** el botón dice «Entrar para reservar».
- **Con sesión:** botón «Reservar plaza»; mientras se envía, «Reservando…» y deshabilitado.
- **Ya reservada o recién reservada:** botón «Ver mi entrada» y el asiento propio marcado en el mapa de aforo.
- **Completa:** «Sin plazas».
- **Resultado de la reserva:** mensaje verde si es correcta y rojo si hay error.

**Entrar (`LoginPage`)**
- **Con errores de validación:** mensaje junto al campo («El correo debe contener @.» o «Escribe tu contraseña.»).
- **Enviando:** el botón pasa a «Entrando…» y queda deshabilitado.
- **Error del servidor:** mensaje en rojo debajo del formulario.

**Mis reservas (`MyReservationsPage`)**
- **Sin sesión:** redirige a la pantalla de entrada y, después de entrar, vuelve a «Mis reservas».
- **Cargando:** «Cargando…» en la cabecera.
- **Error:** «No se pudieron cargar tus reservas. ¿Está encendido el backend?».
- **Vacío:** «Todavía no tienes plazas reservadas», con un botón para ver el programa.
- **Con reservas:** cada una con su estado, «Confirmada» o «Cancelada», y su referencia; las canceladas indican «Plaza liberada».

**Inicio (`HomePage`), Ponentes (`SpeakersPage`) e Información (`InfoPage`)**
- **Cargando:** las cifras de la portada se muestran con un guion y aparece «Cargando charlas…» o «Cargando ponentes…».
- **Error de conexión:** mensaje de error; el resto de textos fijos se sigue viendo.
- **Con datos:** fecha, salas, charlas y ponentes salen de `GET /api/talks`. Si la charla está llena, su tarjeta dice «Sin plazas».
- **Con o sin sesión:** el segundo botón de la portada es «Mis reservas» con sesión y «Entrar para reservar» sin ella; en el pie pasa lo mismo con «Mis reservas» y «Entrar».

## 3. Errores que se tratan

| Situación | Cómo se detecta | Qué hace el frontend | Mensaje al usuario |
|---|---|---|---|
| Backend apagado o sin conexión al cargar charlas | La petición falla | Muestra el error y deja las cifras en blanco | «No se pudo conectar con el servidor. ¿Está encendido el backend?» |
| Backend apagado al entrar | La petición falla | Muestra el error en el formulario | El mismo mensaje de conexión |
| Credenciales incorrectas | Código `invalid_credentials` (401) | Muestra el mensaje del servidor | «Correo o contraseña incorrectos.» |
| Correo o contraseña mal escritos | Validación en el navegador | No envía nada | «El correo debe contener @.» y «Escribe tu contraseña.» |
| Reservar sin sesión | Código `unauthenticated` (401) | Cierra la sesión local | «No has iniciado sesión o tu sesión ha caducado. Vuelve a entrar.» |
| Reservar sin ser asistente | Código `forbidden_role` (403) | Muestra el mensaje | «Solo los asistentes pueden reservar charlas.» |
| Reservar una charla ya reservada | Código `already_reserved` (409) | Recarga las reservas y muestra el mensaje | «Ya tienes una reserva en esta charla.» |
| Reservar una charla sin plazas | Código `talk_full` (409) | Vuelve a pedir la charla al servidor para mostrar las plazas reales | «No quedan plazas libres en esta charla.» |
| Reservar una charla que ya empezó | Código `talk_started` (409) | Muestra el mensaje | «Esta charla ya ha empezado.» |
| La charla no existe | Respuesta 404 | Muestra el mensaje | «No se ha encontrado la charla.» |
| Otro error al reservar | Cualquier otro código | Muestra el número de error | «Error N al reservar.» |
| Sesión caducada al pedir el usuario o las reservas | Respuesta 401 | Cierra la sesión local | — (el usuario vuelve a ver «Entrar») |
| Error al cargar las reservas | Respuesta distinta de 401 | Muestra el aviso | «No se pudieron cargar tus reservas. ¿Está encendido el backend?» |
| Error al cargar una charla | La petición falla | Muestra el error y un enlace para volver | «No se ha podido cargar la charla.» |
| Cierre de sesión sin conexión | La petición falla | Cierra igualmente la sesión en el navegador | — |
| Navegador sin `localStorage` (modo privado) | La lectura o escritura lanza una excepción | La sesión dura lo que la pestaña | — |

**Regla de diseño:** el mensaje que ve el usuario se decide por el campo `code` que devuelve la API y no por el texto ni por el número de error, porque hay dos errores 409 distintos (`already_reserved` y `talk_full`).

## 4. Limitaciones que conviene decir en la defensa
- La vista previa del QR en la entrada **no es un QR válido**: el real lo generará el servidor, cambiará cada 30 segundos y se validará desde 30 minutos antes de la charla (diseñado para febrero).
- No hay registro público de usuarios: las cuentas las crea la organización de las jornadas.
- Las plazas del programa se actualizan al volver a él; si dos personas reservan a la vez, la última lo verá al recargar.
- Las pruebas son manuales; no hay todavía pruebas automáticas del frontend.
