# Requisitos de SABITECH WEB

## 1. Datos de cada charla

Cada charla muestra:
- Título
- Descripción
- Ponente
- Fecha
- Hora de inicio y de fin
- Sala (ubicación)
- Aforo (número de plazas)

## 2. Perfiles y qué puede hacer cada uno

| Perfil | Puede | No puede |
|---|---|---|
| Visitante (sin sesión) | Ver las charlas y el detalle de cada una | Reservar |
| Asistente | Reservar, ver sus reservas y cancelarlas | Ver reservas de otras personas, administrar |
| Organización | Gestionar las charlas, ver las inscripciones y quién asistió | Validar la entrada |
| Personal de acceso | Validar el QR en la puerta | Editar charlas, ver todas las reservas |

## 3. Reglas

- Cada persona puede tener una sola reserva por charla.
- Si no quedan plazas, no se puede reservar y se avisa con un mensaje.
- No se puede reservar una charla que ya ha empezado.
- Se puede cancelar una reserva hasta que empiece la charla.
- Una reserva cancelada no ocupa plaza.
- El QR lo genera el servidor, está ligado a la reserva y caduca a los 30 segundos. El servidor comprueba la hora con su propio reloj, nunca con la del móvil.
- Un QR caducado se rechaza con un mensaje comprensible y no registra asistencia.
- El QR se puede validar desde 30 minutos antes de la charla hasta que acaba.
- No hay registro público: los usuarios de prueba los crea el equipo.

## 4. Fuera de alcance

Este proyecto no incluye:
- Pagos
- Lista de espera
- Aplicación de móvil (solo web)
- Registro público de usuarios