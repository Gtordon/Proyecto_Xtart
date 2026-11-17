# Registro de uso de IA · SABITECH WEB

## 1. Herramientas

| Herramienta | Tipo de ayuda | Apartados afectados | Quién lo ha hecho |
|---|---|---| --- |
| Claude | Planificación, explicaciones, bocetos, borradores, revisión y pruebas | Intermodular, Interfaces, Servidor y Despliegue | Joan |
| Claude Code | Código y documentación | Repositorio inicial y material de referencia del 16/11 | Joan |
| Claude in Chrome | Intento de dibujar bocetos en Figma | Interfaces | Joan |
| Codex | Contraste de documentación con el código | README, API y modelo de datos | Joan |
| ChatGPT | Contraste de respuestas | Revisión general del proyecto | Joan |

## 2. Casos de uso representativos

Estos nueve casos describen mi trabajo (Joan). En cada caso indico cuándo una decisión o una comprobación fue del equipo.

### Caso 1. El modelo de datos: la IA se equivocó y lo corregimos

**Quién lo ha hecho.** Joan.

**Fecha y herramienta.** 6/11/2026 · Claude (chat)

**Contexto.** Claude había preparado las migraciones de solo 3 tablas (talks, reservations y attendances), sin roles ni speakers.

**Prompt real.** «Antes que haga commit, revisa todos los documentos del proyecto y revisa si la base de datos solo tiene que tener esas tablas, porque en la tabla que hice organizando la base de datos yo he puesto más; roles y speakers.»

**Qué propuso la IA.** Reconoció que se había equivocado: el enunciado (p. 12, apartado 4.9) pide representar «usuarios, perfiles, charlas, reservas y asistencias», y nuestro diseño (Tablas.pdf) ya tenía las 6 tablas.

**Qué hicimos.** Descartamos su primera propuesta y mantuvimos nuestro diseño de 6 tablas: roles, users, speakers, talks, reservations y attendances.

**Por qué.** Antes de subir nada lo comparé con el enunciado y con nuestro propio diseño. La IA había resumido mal lo que pedía el PDF.

**Cómo se comprobó.** Contrastando el texto del enunciado y nuestro Tablas.pdf.

### Caso 2. ¿Hacen falta ramas para cada documento? Comprobar lo que dice la IA

**Quién lo ha hecho.** Joan.

**Fecha y herramienta.** 5/11/2026 · Claude (chat)

**Contexto.** La guía de organización, hecha con IA, proponía crear una rama y un Pull Request para cada documento.

**Prompt real.** «Busca en el documento del enunciado del proyecto y comprueba si se exige una forma concreta de trabajar con GitHub»

**Qué propuso la IA.** Buscó en el enunciado y respondió que no exige ramas ni Pull Requests: lo había propuesto la guía hecha con IA. El enunciado solo pide que el repositorio y el registro de tareas permitan seguir la evolución del trabajo (apartado 4.3).

**Qué hicimos.** Seguimos trabajando con ramas y Pull Requests, sabiendo que es una decisión del equipo y no un requisito.

**Por qué.** Nos aclaramos bien así.

**Cómo se comprobó.** Búsqueda en el texto del enunciado: no aparecen «rama» ni «pull request».

### Caso 3. Sanctum o token propio: la IA no adivinó y preguntamos al profesor

**Quién lo ha hecho.** Joan.

**Fecha y herramienta.** 10/11/2026 · Claude (chat)

**Contexto.** Teníamos Sanctum instalado para el inicio de sesión.

**Prompt real.** «El profesor me dice que no hace falta Sancutm, que en la primera consulta json se generan los tokens automáticamente, asi que vamos a hacerlo de esta forma. Comprueba en que sitios más hemos usado Sanctum»

**Qué propuso la IA.** Comprobó dónde estaba Sanctum en el repositorio y explicó que la indicación del profesor se podía entender de varias formas. En lugar de adivinar, me propuso preguntarle qué mecanismo quería exactamente.

**Qué hicimos.** Pregunté al profesor y le contesté a la IA: «Me ha dicho eso que devuelve un token que se guarda en la tabla de usuarios». Programé un token propio que caduca a las 8 horas (commits 39a9390, 039fef1 y c2456bc). La IA propuso guardar solo la huella (hash SHA-256) del token y lo acepté.

**Por qué.** Seguir la indicación del profesor. Guardar la huella es como con las contraseñas: si alguien ve la tabla, no puede usar los tokens.

**Cómo se comprobó.** php artisan db:table users (aparecen las dos columnas nuevas), php artisan tinker, curl de login y de logout, y probando desde la web.

### Caso 4. El parche completo que descarté para programarlo yo

**Quién lo ha hecho.** Joan.

**Fecha y herramienta.** 9-10/11/2026 · Claude (chat)

**Contexto.** Íbamos atrasados con el backend.

**Prompt real.** «Quiero dejar los checks de los últimos días cerrados para poder seguir trabajando al día y no retrasarnos. Actúa como un asistente de programación y ayúdame a programar »

**Qué propuso la IA.** Un parche completo: login, reservas, cancelación, 24 pruebas, documentación y CI.

**Qué hicimos.** Lo descarté y le contesté: «el backend login reservas quiero programarlo yo. Explicamelo paso a paso porque de todo lo que me has dicho no lo he entendido». Escribí yo el código siguiendo sus explicaciones y el parche solo lo usé para comparar.

**Por qué.** No entendía el código del parche y quería programarlo y entenderlo yo.

**Cómo se comprobó.** Las del caso 3 para el login.

### Caso 5. La reserva, programada por partes y probada en local

**Quién lo ha hecho.** Joan.

**Fecha y herramienta.** 13/11/2026 · Claude (chat)

**Contexto.** Había que programar la reserva con control de aforo y duplicados.

**Prompt real.** «No he entendido lo que tenemos que hacer en este apartado. Actúa como un profesor de programación y explícame como programar la reserva para que lo pueda hacer entendiendo lo que hago.»

**Qué propuso la IA.** Explicó la reserva como 7 comprobaciones en lenguaje sencillo (el ejemplo del camarero que comprueba que hay sitio antes de apuntar una mesa) y me fue dando el código por trozos para que yo lo escribiera.

**Qué hicimos.** Escribí ReservationService, la ruta de reservar y Mis reservas (commits 3b62b6f, dbe88df y c5492ad).

**Por qué.** Para entender cada comprobación: perfil, charla, charla empezada, duplicado y aforo.

**Cómo se comprobó.** Pruebas con curl en local: 201 al reservar, 409 already_reserved al repetir, 404 talk_not_found, 401 sin sesión, 201 en la última plaza, 409 talk_full con la charla llena y 403 forbidden_role con el usuario de organización.

### Caso 6. La hora salía mal en el ordenador de Guillermo

**Quién lo ha hecho.** Joan.

**Fecha y herramienta.** 16/11/2026 · Claude (chat)

**Contexto.** Probando el proyecto en otro ordenador.

**Prompt real.** «Mi compañero Guillermo está comprobando la app y las charlas que deberían salir a las 10:00 salen a las 11:00. Puedes comprobar si hubo algún error en el commit que hice ayer con el arreglo de la zona horaria?»

**Qué propuso la IA.** Explicó que el arreglo de la zona horaria (Europe/Madrid) estaba en una rama que todavía no se había unido a main, y que después había que ejecutar php artisan config:clear.

**Qué hicimos.** Abrí la PR de la rama backend-hora-errores, se unió a main (PR #36) y añadimos una prueba automática que falla si la hora vuelve a salir mal.

**Por qué.** El fallo solo aparecía en un ordenador que no tenía el arreglo.

**Cómo se comprobó.** En el navegador, la charla de las 10:00 sale a las 10:00. Prueba automática «la hora se envia en hora de madrid».

### Caso 7. «Access denied» en MySQL: la IA evitó una solución que no servía

**Quién lo ha hecho.** Joan.

**Fecha y herramienta.** 16/11/2026 · Claude (chat)

**Contexto.** Laravel daba «Access denied for user 'sabitech'@'192.168.65.1'» y pensé que el proyecto estaba roto.

**Prompt real.** «Comprueba si mi versión de GitHub está rota y provoca el error de “Access denied for user…”. Así descartamos posibles fallos y comprobamos que tipo de fallo es y como solucionarlo. Se me ocurre descargar de nuevo la última versión del proyecto. Valora esta opción en base a tus conclusiones.»

**Qué propuso la IA.** Respondió que descargar de nuevo el proyecto no lo arreglaría: la IP era la de Docker Desktop, y un contenedor de MySQL ocupaba el puerto 3306 en lugar de mi MySQL de Homebrew. Me dio los pasos: ver quién usa el puerto, parar Docker y reiniciar MySQL.

**Qué hicimos.** Seguí los pasos. Los datos estaban intactos.

**Por qué.** Volver a descargar el proyecto habría costado tiempo sin arreglar nada.

**Cómo se comprobó.** php artisan tinker devolvió «users 5 talks 3» y la web volvió a cargar las charlas.

### Caso 8. Los bocetos

**Quién lo ha hecho.** Joan.

**Fecha y herramienta.** 4-5/11/2026 · Claude (chat)

**Contexto.** Clase de Diseño de Interfaces: había que dibujar los bocetos de las pantallas.

**Prompt real.** «Actúa como un diseñador de bocetos para frontend. Puedes generar un boceto inicial de como se vería la aplicación de SABITECH para orientarnos a la hora de crear los bocetos y así organizar como se verá el frontend? Usa como referencia para ver como generar la foto el pdf que tienes subido con la información necesaria. Genera los bocetos de la página de inicio y de la pantalla donde saldrán tus charlas reservadas»

**Qué propuso la IA.** Generó los bocetos de la pantalla de inicio de la app y de las charlas.

**Qué hicimos.** Los usé como referencia para hacer mis bocetos con draw.io.

**Por qué.** Agilizar el proceso creativo que se nos hace difícil a los 3.

**Cómo se comprobó.** Los revisamos los 3.

### Caso 9. Los vídeos de inglés: comprobar los minutos en el vídeo

**Quién lo ha hecho.** Joan.

**Fecha y herramienta.** 6/11/2026 · Claude (chat)

**Contexto.** Parte de Inglés Oral: buscar vídeos en inglés sobre IA en programación.

**Prompt real.** «Necesito que me propongas 2 vídeos para la parte de Inglés Oral del Proyecto SABITECH. Tienes adjunto el enunciado para usar como referencia al buscar en YouTube.»

**Qué propuso la IA.** Propuso vídeos sobre el uso responsable de la IA en programación

**Qué hicimos.** Vi los vídeos y los que eran interesantes para añadirlos al proyecto usé la información que proporcionaba el vídeo para hacer el trabajo.

**Por qué.** Muchos vídeos que encontraba en YouTube no me daban la información necesaria para el proyecto

**Cómo se comprobó.** Viendo cada vídeo y comprobando que realmente tenían información útil para el proyecto.

## 3. Inventario de usos

Este inventario recoge el trabajo que hice yo, Joan, con las herramientas indicadas.

| Fecha | Herramienta | Apartado | Petición | Resultado | Comprobación | Quién lo ha hecho |
|---|---|---|---|---|---| --- |
| 04/11/2026 | Claude | Guía de organización | Le pasé el enunciado y el Gantt y le pedí una guía para el checkpoint | Usé la guía como orientación | Contrasté las tareas con el enunciado | Joan |
| 04/11/2026 | Claude | Plan de la clase: repositorio y bocetos | Pedí un paso a paso para trabajar en una hora | Pendiente de precisar qué se aprovechó del plan | Comprobé que el diseño de referencia encajaba con lo que queríamos | Joan |
| 04/11/2026 | Claude in Chrome | Bocetos en Figma | Intentar dibujarlos desde el navegador | Descarté el intento porque el editor no cargó y quedó un archivo vacío | Capturas de la sesión | Joan |
| 04/11/2026 | Claude | Bocetos de inicio de sesión y reservas | Generar imágenes de referencia | Usé las imágenes para dibujar mis bocetos en draw.io | Los revisamos entre los tres | Joan |
| 05/11/2026 | Claude | Requisitos y pantallas | Pedí una explicación paso a paso de las primeras tareas | Usé la propuesta como orientación y escribí los documentos | Pendiente de concretar | Joan |
| 06/11/2026 | Claude | Modelo de datos y migraciones | Revisar qué tablas exigía el enunciado | Descartamos el primer diseño de la IA y mantuvimos las seis tablas del equipo. La IA preparó las migraciones | Contrasté la propuesta con el enunciado y `Tablas.pdf` | Joan |
| 06/11/2026 | Claude | API de charlas | Preparar el listado y el detalle paso a paso | Integré `TalkController` y las rutas (commit `52ef605`) | Probé el listado y el detalle en el navegador con una charla y comprobé el 404 para un ID inexistente | Joan |
| 04–09/11/2026 | Claude (Claude Docs) | Material de estudio | Explicar lo hecho en lenguaje sencillo para poder defenderlo | Lo usé como material de estudio | — | Joan |
| 06/11/2026 | Claude | Inglés Oral | Buscar dos vídeos y preparar un borrador con referencias APA | Descarté el borrador. Vi los vídeos y aproveché la información pertinente | Comprobé las referencias de tiempo en el propio vídeo | Joan |
| 09/11/2026 | Claude | Parche de backend, pruebas, documentación y CI | Poner al día las tareas pendientes | Descarté el parche y lo usé como referencia mientras programaba paso a paso | Claude ejecutó 24 pruebas y peticiones con curl en su propia copia | Joan |
| 09–10/11/2026 | Claude | Inicio de sesión y errores JSON | Pedí una explicación para programar el token propio | Escribí el código siguiendo la guía (commits `39a9390`, `039fef1` y `c2456bc`) | Revisé la tabla de usuarios y probé el login y el logout con curl y en la web | Joan |
| 13/11/2026 | Claude | Reservar plaza y Mis reservas | Pedí ayuda paso a paso para entender la lógica | Escribí el código por partes (commits `3b62b6f`, `dbe88df` y `c5492ad`) | Probé con curl los resultados del caso 5 | Joan |
| 16/11/2026 | Claude | Planificación del checkpoint | Pedí un diagnóstico, una plantilla de memoria, un tablero y un PPT | Copié el tablero a Drive. El borrador indica que la plantilla, el tablero y el PPT seguían sin utilizarse | — | Joan |
| 16/11/2026 | Claude | MySQL y rescate de documentos | Investigar por qué Laravel no conectaba | Seguí los pasos para liberar el puerto 3306 y arrancar el MySQL de Homebrew | La web volvió a cargar las charlas | Joan |
| 16/11/2026 | Claude | Seeder | Añadir a Carla para probar una charla sin plazas | Acepté el cambio (commit `1c4b42a`) | Recargué los datos de prueba y comprobé que Carla recibía `talk_full` | Joan |
| 16/11/2026 | Claude | Zona horaria y errores de la API | Revisar el desfase de una hora y las respuestas con datos internos | Acepté el cambio (commit `b0fcd15`) | Verifiqué la hora en el navegador. La prueba automática se añadió el 17/11 | Joan |
| 16/11/2026 | Claude Code (Fable) | Material de referencia en `~/sabitech-referencia` | Preparar una versión de referencia a partir del enunciado y el repositorio | Descarté los 17 commits y los materiales generados para la entrega | — | Joan |
| 17/11/2026 | Claude | Pruebas, CI, API, modelo de datos y README | Escribir pruebas, recuperar la CI y documentar el código real | Revisé la propuesta y se ajustaron Laravel, el texto de la API y las acciones de CI. También se quitó un archivo vacío | 22 pruebas del backend correctas. Lint y build sin errores | Joan |
| 17/11/2026 | Claude | Auditoría del checkpoint y revisión de `tests-docs-ci` | Contrastar el proyecto con el enunciado | Aproveché el plan y el reparto de tareas | Claude probó en un entorno aislado SQLite, MySQL, la API, ocho intentos simultáneos para la última plaza y el recorrido en navegador | Joan |
| 17/11/2026 | Claude | Registro de IA | Reconstruir los usos a partir de chats, Git y documentos | Completé el borrador con un cuestionario | Revisé las referencias a chats, archivos y commits | Joan |
| 17/11/2026 | Codex | API, modelo de datos y README | Contrastar la documentación con el código y las migraciones y corregir las discrepancias | Acepté las correcciones de la documentación | Comparación con las rutas, el frontend y las migraciones | Joan |
| Fecha pendiente | ChatGPT | Revisión general | Pedí una segunda comprobación del proyecto | Contrasté respuestas de Claude | Pendiente de concretar | Joan |
| 17/11/2026 | ChatGPT | Registro de IA, README y demás archivos revisados | Pasar el borrador del registro a Markdown y revisar el README y los demás archivos | Usé la ayuda para convertir el registro y revisar la documentación del proyecto | Comparé el registro con el borrador y la documentación con los archivos del proyecto | Joan |
