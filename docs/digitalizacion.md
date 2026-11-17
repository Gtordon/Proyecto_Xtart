# Digitalización
## 1. Qué cambia al pasar de papel a la web

Hasta ahora, apuntarse a una charla era rellenar una hoja o mandar un correo y esperar respuesta, y saber si quedaban plazas suponía contar las inscripciones a mano. Con SABITECH WEB cada persona reserva ella misma, ve al momento cuántas plazas quedan y recibe una referencia única. Lo más importante es que el control del aforo deja de depender de que alguien cuente bien: el servidor no deja pasar del aforo, ni siquiera si dos personas reservan la última plaza a la vez.

Todavía no tenemos datos reales de uso, así que no decimos cuánto tiempo se ahorra; solo qué tareas desaparecen.

| Antes, a mano | Con la web |
|---|---|
| Rellenar una hoja o mandar un correo y esperar | Reservar uno mismo con la sesión iniciada |
| Contar inscripciones para saber si hay sitio | Las plazas libres se calculan solas con las reservas confirmadas |
| Fiarse de que nadie se equivoque al contar | El servidor bloquea la charla al reservar y rechaza la reserva si no quedan plazas |
| Contestar los correos uno a uno | La reserva se confirma al momento con su referencia |
| Lista en papel en la puerta | QR que caduca a los 30 segundos (diseñado para febrero) |
| Marcar a mano quién vino | Registro de asistencias (la tabla ya existe; la pantalla llega en febrero) |

## 2. Datos personales que guardamos

| Dato | Para qué | Quién lo ve |
|---|---|---|
| Nombre y correo | Identificar a la persona y permitir el inicio de sesión | La propia persona y la organización |
| Contraseña | Iniciar sesión | Nadie: solo se guarda cifrada |
| Token de sesión | Mantener la sesión iniciada | Nadie: el servidor guarda solo su hash y caduca a las 8 horas |
| Reservas | Controlar el aforo y mostrar "Mis reservas" | Cada persona, solo las suyas; la organización, todas (en febrero) |
| Asistencias | Saber quién acudió | Organización y personal de acceso (en febrero) |

En las pruebas solo hay datos inventados (`@sabitech.test`), nunca datos reales.

## 3. Herramientas

| Herramienta | Para qué la usamos |
|---|---|
| GitHub | Repositorio, ramas y Pull Requests revisados siempre por otro compañero |
| VS Code | Editor de código |
| Laravel 12 (PHP) | Backend y API |
| MySQL 8.4 en Docker | Base de datos, la misma en los tres ordenadores |
| React con Vite | Frontend |
| Thunder Client | Pruebas de la API |
| Google Docs | Memoria compartida |
| Claude y ChatGPT | Planificar, entender errores, revisar código y proponer cambios (ver `registro-ia.md`) |

## 4. Uso de la IA

La IA ha sido una herramienta de apoyo, no una parte de la aplicación: SABITECH WEB no lleva ningún asistente inteligente. Todo lo que salía de la IA lo probábamos en local y pasaba por un Pull Request revisado por otro compañero antes de entrar en `main`. Cada uso real está apuntado en `docs/registro-ia.md`, con qué se pidió, qué se aceptó o cambió y cómo se comprobó.

## 5. Medidas de protección

- Las contraseñas se guardan cifradas y el token de sesión solo como hash, con caducidad de 8 horas.
- Las rutas privadas piden sesión; cada usuario solo ve sus propias reservas y solo los asistentes pueden reservar. Los permisos se comprueban en el servidor (ver `docs/permisos.md`).
- El inicio de sesión permite como mucho 10 intentos por minuto y su error no dice si falla el correo o la contraseña.
- Los errores de la API no enseñan datos internos del servidor.
- El archivo `.env` no se sube a GitHub; solo `.env.example`.
- **Pendiente:** quitar la contraseña de ejemplo de MySQL de `docker-compose.yml` y de `.env.example` antes de publicar.
