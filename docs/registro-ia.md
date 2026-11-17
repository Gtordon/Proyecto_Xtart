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

---

# Registro de uso de IA · SABITECH WEB · Guillermo

## 1. Herramientas

| Herramienta | Tipo de ayuda | Apartados afectados | Quién lo ha hecho |
|---|---|---|---|
| Claude (chat) | Explicaciones del enunciado y de Git, propuestas de código, revisión y redacción | Servidor (seeder), Interfaces (frontend y estilos), Intermodular (memoria) | Guillermo |
| Claude con acceso a la carpeta del proyecto | Revisar el código en local, proponer cambios y sacar capturas de las pruebas | Interfaces y pruebas | Guillermo |

## 2. Casos de uso representativos

Estos siete casos son de mi parte (Guillermo). Cuando algo lo decidió o lo revisó otro compañero, lo indico.

### Caso 1. Cómo organizarnos con las ramas

**Quién lo ha hecho.** Guillermo.

**Fecha y herramienta.** 09/11/2026 · Claude (chat)

**Contexto.** Al empezar a programar no sabía cuántas ramas abrir ni cómo dejar `main`.

**Prompt real.** «Somos tres en un repo de GitHub. Según el enunciado adjunto, ¿exige alguna forma de trabajar con ramas? Si no la exige, propón un flujo sencillo (ramas, Pull Requests y revisión) y dime qué parte es obligatoria y qué parte es decisión nuestra.»

**Qué propuso la IA.** Una rama por tarea, que nada entre en `main` sin un Pull Request revisado por otro, y reorganizar las ramas antiguas.

**Qué hicimos.** Me quedé con lo de una rama por tarea y PR revisado. Lo de reorganizar las ramas viejas no lo hice.

**Por qué.** Reorganizar ramas que ya tenían trabajo podía hacernos perder cambios y no aportaba nada.

**Cómo se comprobó.** Todos mis cambios han entrado en `main` por PR revisados por Joan o Alberto.

### Caso 2. Los datos de prueba del seeder

**Quién lo ha hecho.** Guillermo.

**Fecha y herramienta.** 09/11/2026 · Claude (chat)

**Contexto.** Me tocaba el seeder: usuarios con sus roles, charlas y reservas para poder probar la web.

**Prompt real.** «Escribe un seeder de Laravel para estas tablas (roles, users, speakers, talks, reservations): 3 roles, 5 usuarios con contraseña de prueba y 3 charlas con 100, 1 y 0 plazas libres. Que se pueda ejecutar varias veces sin duplicar datos y explícame cada bloque.»

**Qué propuso la IA.** La estructura del seeder con roles, ponentes, usuarios, charlas y reservas.

**Qué hicimos.** Cambié nombres y datos. Al ejecutarlo salieron dos fallos y los corregí: una errata en un método y una charla «completa» con más reservas que plazas. Después lo hice repetible con `firstOrCreate` para poder lanzarlo varias veces.

**Por qué.** Necesitábamos tres casos claros para probar: charla con sitio, con una sola plaza y llena.

**Cómo se comprobó.** `php artisan migrate:fresh --seed`, `db:seed` dos veces seguidas sin error y `GET /api/talks` devolviendo 100, 1 y 0 plazas libres.

### Caso 3. Qué pide Diseño de Interfaces

**Quién lo ha hecho.** Guillermo.

**Fecha y herramienta.** 13/11/2026 · Claude (chat)

**Contexto.** Iba a ponerme con los estilos y no tenía claro qué pedía exactamente el módulo.

**Prompt real.** «A partir del apartado de Diseño de Interfaces Web del enunciado adjunto, hazme una lista de comprobación de lo que tiene que cumplir el frontend (responsive, accesibilidad, guía de estilo), ordenada por prioridad para el checkpoint del 18/11.»

**Qué propuso la IA.** Una lista de lo que pide el enunciado (responsive, accesibilidad, guía de estilo, coherencia visual) y por dónde empezar.

**Qué hicimos.** La usé como lista de control. Al mirarlo vimos que el CSS seguía siendo la plantilla de Vite, así que los estilos había que hacerlos casi desde cero.

**Por qué.** Prefería saber primero qué se iba a evaluar antes de tocar código.

**Cómo se comprobó.** Contrastando la lista con el enunciado y con el código que había en el repo.

### Caso 4. El rediseño con Umbral Labs: lo que no acepté

**Quién lo ha hecho.** Guillermo.

**Fecha y herramienta.** 16/11/2026 · Claude (chat)

**Contexto.** Quería que la web llevara la identidad de nuestra empresa ficticia, Umbral Labs. Le pasé la imagen del logo.

**Prompt real.** «Adjunto el logo de Umbral Labs, nuestra empresa ficticia. Propón una paleta para la web basada en sus colores, comprueba el contraste para accesibilidad y dime si el enunciado permite poner nuestra marca en la web de SABITECH y dónde.»

**Qué propuso la IA.** Avisó de que cambiar el nombre de la web chocaba con el enunciado, que separa la marca de la empresa de la de SABITECH, y propuso usar Umbral Labs solo como firma.

**Qué hicimos.** No cambié el nombre. Me quedé con la paleta azul de Umbral Labs y el logo como firma en el login y en Mis reservas.

**Por qué.** La web es de SABITECH; nosotros somos la empresa que la hace.

**Cómo se comprobó.** Capturas en móvil y escritorio, contraste de los colores y PR revisado por Joan.

### Caso 5. Pasar el diseño al frontend sin el «modo de ejemplo»

**Quién lo ha hecho.** Guillermo, con la revisión de Alberto.

**Fecha y herramienta.** 16/11/2026 · Claude (con acceso a la carpeta del proyecto)

**Contexto.** Teníamos una propuesta de diseño en una carpeta aparte (`demo`) y había que llevarla al frontend real.

**Prompt real.** «Pasa el diseño de la carpeta demo al frontend del proyecto conectándolo a la API real. Avísame de cualquier parte de la demo que no deba ir a la web final, por ejemplo datos de ejemplo o accesos sin servidor.»

**Qué propuso la IA.** Pasar las pantallas y estilos al frontend. La demo traía un modo de prueba que, con el servidor apagado, dejaba entrar con cualquier correo.

**Qué hicimos.** Aplicamos el diseño y quitamos ese modo de prueba. Alberto pidió probarlo con el backend encendido antes de unirlo.

**Por qué.** En la web real dejar entrar con cualquier correo sería un fallo de seguridad.

**Cómo se comprobó.** Recorrido completo con el backend real: entrar, reservar, ver Mis reservas y salir.

### Caso 6. Los avisos de la auditoría: los arreglé yo

**Quién lo ha hecho.** Guillermo. La auditoría la había preparado Joan.

**Fecha y herramienta.** 17/11/2026 · Claude (chat)

**Contexto.** La auditoría del checkpoint marcaba tres cosas del frontend: faltaba el proxy de Vite, las plazas no se recargaban tras reservar y un comentario hablaba de Sanctum cuando usamos token propio.

**Prompt real.** «Para cada aviso de la auditoría que afecta al frontend, dime el archivo, la línea y el cambio, y explícame por qué falla. Los cambios los hago yo a mano.»

**Qué propuso la IA.** El archivo y la línea de cada cambio con el código a poner.

**Qué hicimos.** Hice los cambios a mano, archivo por archivo, y repetí las pruebas.

**Por qué.** Quería saber qué tocaba cada cambio para poder explicarlo en la defensa.

**Cómo se comprobó.** Las 9 pruebas del recorrido en el navegador correctas y `npm run build` sin errores.

### Caso 7. Una memoria menos acartonada

**Quién lo ha hecho.** Guillermo.

**Fecha y herramienta.** 17/11/2026 · Claude (chat)

**Contexto.** Primer borrador de la memoria y de mis documentos (`pruebas.md`, `permisos.md`, `digitalizacion.md`).

**Prompt real.** «Reescribe este texto con un tono natural, como lo explicaría un estudiante de 2º de DAW. No cambies ningún dato técnico y señálame cualquier frase que no coincida con lo que hace la web.»

**Qué propuso la IA.** Una segunda versión con un tono más natural.

**Qué hicimos.** Me quedé con la segunda y la revisé frase a frase para que dijera lo que de verdad hace la web.

**Por qué.** La primera sonaba a texto de manual y no a algo escrito por nosotros.

**Cómo se comprobó.** Comparando lo escrito con el código del repo y con mis pruebas del 17/11. La revisamos en equipo antes de entregar.

## 3. Inventario de usos

Este inventario recoge el trabajo que hice yo, Guillermo, con las herramientas indicadas.

| Fecha | Herramienta | Apartado | Petición | Resultado | Comprobación | Quién lo ha hecho |
|---|---|---|---|---|---|---|
| 09/11/2026 | Claude | Organización con Git | Cómo trabajar con ramas y `main` | Rama por tarea y PR revisado; no reorganicé las ramas viejas | PR revisados en el repo | Guillermo |
| 09/11/2026 | Claude | Seeder | Escribir los datos de prueba | Adapté datos y corregí dos fallos | `migrate:fresh --seed` y `GET /api/talks` | Guillermo |
| 10/11/2026 | Claude | Seeder | Arreglar el error al relanzarlo | Pasé todo a `firstOrCreate` | `db:seed` dos veces sin error | Guillermo |
| 12/11/2026 | Claude | Router, páginas y login | Montar el frontend con los pasos del enunciado | Usé el código; corregí yo los errores de tecleo que dejaban la pantalla en blanco | `npm run dev`; PR #29 y #30 revisados por Joan | Guillermo |
| 13/11/2026 | Claude | Diseño de Interfaces | Qué pide el módulo para los estilos | Lista de control; vimos que el CSS era aún el de Vite | Contraste con el enunciado | Guillermo |
| 15/11/2026 | Claude | Primera versión del diseño | Diseño limpio y fluido | Se descartó al pasar a la propuesta de rediseño | Capturas en móvil y escritorio | Guillermo |
| 16/11/2026 | Claude | Paso de la demo al frontend | Aplicar el diseño en el proyecto | Aceptado sin el modo de ejemplo | Recorrido con el backend real; revisión de Alberto en el PR #34 | Guillermo |
| 16/11/2026 | Claude | Identidad Umbral Labs | Colores, logo y nombre | Colores y firma sí; nombre no | Capturas y PR #37 revisado por Joan | Guillermo |
| 17/11/2026 | Claude | Auditoría del frontend | Dónde arreglar cada aviso | Cambios hechos por mí en 4 archivos | 9 pruebas manuales y `npm run build` | Guillermo |
| 17/11/2026 | Claude con acceso al proyecto | Capturas de las pruebas | Sacar las capturas del recorrido para la memoria | 12 capturas en `docs/capturas_pruebas/` | Revisadas una a una contra la web | Guillermo |
| 17/11/2026 | Claude | Documentación y memoria | Redactar `pruebas.md`, `permisos.md`, `digitalizacion.md` y la memoria | Pedí un tono más natural y revisé el contenido | Comparado con el código y las pruebas | Guillermo |