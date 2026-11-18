# Diseño del correo de confirmación y del QR de asistencia

Diseño para el checkpoint. El correo se programará en la semana 8 (diciembre)

y el QR en la semana 9. Las pruebas completas se harán en enero.

## 1. Correo de confirmación

### Cuándo se envía

Solo cuando el servidor ha guardado la reserva como confirmada, después de que

termine la transacción de `ReservationService`. El envío irá a la cola de

Laravel para que la respuesta de la reserva no espere al servidor de correo.

### Qué lleva

- Asunto: «Reserva confirmada: (título de la charla)».

- Nombre del asistente, charla, fecha, horario, sala y referencia.

- Aviso: el correo confirma la plaza, pero no es la entrada ni registra la

  asistencia. El QR se abre el día de la charla desde «Mis reservas».

### Qué pasa si el envío falla

- La reserva sigue confirmada y aparece en «Mis reservas».

- Se guarda el estado del aviso en la reserva (`pendiente`, `enviado` o `fallido`)

  y el error queda en el log de Laravel.

- Se podrá reenviar el aviso sin crear otra reserva: la ruta de reenvío solo

  manda el correo de una reserva que ya existe.

### Cómo lo probaremos

Con un buzón de prueba que no envie realmente el correo. Casos: reserva válida y correo con los datos

correctos; fallo simulado del correo con la reserva todavía guardada; reenvío

sin crear una segunda reserva.
