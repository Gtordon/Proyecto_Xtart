# Diseño del correo de confirmación y del QR de asistencia

Diseño para el checkpoint. El correo se programará en la semana 8 (diciembre)

y el QR en la semana 9. Las pruebas completas se harán en enero.

## 2. QR de asistencia

### Cómo funciona

El asistente abre su entrada desde «Mis reservas» y el personal de acceso

escanea el QR en la puerta. Hoy esa pantalla solo muestra una vista previa sin

valor.

### Qué lleva el QR

Un código que genera el servidor con el número de la reserva y el intervalo de

30 segundos en el que se creó, firmado con la clave de la aplicación

(`APP_KEY`). La firma funciona como un sello: si alguien cambia algo del

código, deja de coincidir. El navegador pide un código nuevo cada 30 segundos.

### Cómo lo valida el servidor

Solo el perfil de personal de acceso puede validar. El servidor comprueba, con

su propio reloj y nunca con el del móvil:

1. Que la firma es correcta. Si no, el código está manipulado y se rechaza.

2. Que el código es del intervalo actual o del anterior. Esa es toda la

   tolerancia, como máximo 30 segundos de más, para un escaneo justo en el

   cambio. Si no, ha caducado y se rechaza.

3. Que la reserva está confirmada y que la charla está entre 30 minutos antes

   del inicio y el final.

4. Que no hay ya una asistencia para esa reserva. Si la hay, responde

   «asistencia ya registrada» sin crear otra: lo garantiza además el

   `UNIQUE (reservation_id)` de la tabla `attendances`.

### Si el asistente no puede enseñar el QR

El personal de acceso busca la reserva por referencia o por nombre y registra la

asistencia a mano. Queda apuntado quién la validó (`validated_by`).

### Limitaciones

Que el QR cambie cada 30 segundos reduce el tiempo en que se puede reutilizar,

pero no demuestra que la persona esté allí: alguien podría enviar una captura

al momento. Por eso el personal de acceso puede pedir que se vea el nombre en la

sesión abierta.

### Cómo lo probaremos (segundo chekpoint)

QR vigente: asistencia registrada. QR caducado: rechazo. QR alterado: rechazo.

QR repetido: no se duplica. Validar con un usuario asistente: 403.
