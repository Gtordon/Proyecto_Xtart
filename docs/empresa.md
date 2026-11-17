# Umbral Labs SL — apartado empresarial (borrador para `docs/empresa.md`)

> Borrador de SABITECH WEB para IPE II. Preparado con ayuda de IA; ese uso queda declarado en el informe de IA del proyecto.
> **[DECIDIR]** = lo tiene que decidir el equipo. **[COMPROBAR]** = hay que confirmarlo en la fuente oficial antes de entregar. **[FALTA]** = dato o documento que todavía no existe. No hay ninguna cifra inventada.

## 1. La empresa y la necesidad que cubre
**Umbral Labs SL** es una empresa ficticia que ofrece SABITECH como servicio a quien organiza jornadas, charlas y talleres. Cubre un problema concreto: organizar la inscripción y la asistencia sin formularios sueltos ni hojas de cálculo.

La necesidad sale de la validación con una persona real que organiza eventos (apartado 7): gestiona las reservas con formularios de Google y Excel, con registro manual, duplicados, aforo superado y un control de asistencia difícil.

**Clientes:** organizadores de charlas con plazas limitadas, sobre todo jornadas tecnológicas. Es el público de la persona que validó la idea. Otros públicos, como centros educativos o asociaciones, quedan como ampliación futura. *(Decidido por Alberto el 2026-11-12.)*

## 2. Propuesta de valor
Cada beneficio se corresponde con una función de SABITECH que se puede comprobar en la demo:
- **Catálogo claro:** título, fecha, hora, lugar y plazas libres de cada charla, que es lo que pidió la persona validada.
- **Reserva rápida:** dos pasos como máximo, con confirmación clara de que la plaza está reservada.
- **Aforo y duplicados controlados en el servidor:** no se puede superar el aforo ni reservar dos veces la misma charla.
- **Control de asistencia con QR temporal:** el QR se renueva cada 30 segundos y se valida en el servidor, desde móvil o tablet.

## 3. Tipo de empresa y forma jurídica
**Sociedad de Responsabilidad Limitada (SL), con tres socios.** *(Decidido por Alberto el 2026-11-12. Joan y Guillermo tienen IPE convalidada y han dejado esta parte en sus manos.)*
- Responsabilidad limitada al capital aportado, adecuada para un proyecto de tres socios.
- Capital mínimo de 1 euro, que establece la Ley 18/2022, de creación y crecimiento de empresas (BOE-A-2022-15818), al modificar el artículo 4 de la Ley de Sociedades de Capital. Comprobado en el texto del BOE (ELI) el 2026-11-12.
- Se descartan, de momento, el autónomo (responsabilidad ilimitada, con tres personas) y la sociedad anónima (capital y trámites desproporcionados para el tamaño previsto). **[COMPROBAR]** que la justificación se sostiene con la fuente.

## 4. Organigrama (propuesta)
**Socios-administradores (los tres promotores):** deciden la estrategia, responden de la sociedad y firman las cuentas. Son los tres del proyecto, *(decidido por Alberto)*.

**Plantilla de la empresa (puestos ficticios, no los socios):**
- **Responsable técnico de backend y datos:** API, reservas, aforo, correo y QR en servidor.
- **Responsable de frontend:** aplicación web en React y mantenimiento de la interfaz.
- **Responsable de diseño y accesibilidad:** interfaz, guía de estilo y organización de la información.
- **Soporte de eventos (temporal):** atención el día del evento, que pidió la persona validada.

## 5. Plan de personal y contratación
| Puesto | Funciones | Dedicación | Contratación |
|---|---|---|---|
| Socio de backend | API, base de datos, seguridad | 10-12 h/semana en desarrollo; menos en mantenimiento *(decidido por Alberto)* | Socio-administrador |
| Socio de frontend y gestión | Aplicación web, administración | 10-12 h/semana en desarrollo; menos en mantenimiento *(decidido por Alberto)* | Socio-administrador |
| Socio de diseño | Interfaz, accesibilidad, digitalización | 10-12 h/semana en desarrollo; menos en mantenimiento *(decidido por Alberto)* | Socio-administrador |
| Soporte de eventos | Atención el día del evento | Por eventos | Contrato temporal **[COMPROBAR]** |

**Causa de la contratación temporal:** el soporte se necesita solo los días de evento, así que es una necesidad temporal y no permanente. Según el artículo 15 del Estatuto de los Trabajadores (Real Decreto Legislativo 2/2015, consultado el 2026-11-16), las causas posibles son obra o servicio determinado, circunstancias de la producción (máximo seis meses en un periodo de doce) e interinidad. Para el soporte de eventos, la causa más ajustada es la de **obra o servicio determinado**, porque cada evento tiene una duración limitada **[DECIDIR]** con el equipo.

- **Convenio aplicable:** XIX Convenio colectivo estatal de empresas de consultoría, tecnologías de la información y estudios de mercado y de la opinión pública (BOE-A-2025-7766, de 16 de abril de 2025, vigencia 2025-2027). Comprobado en el texto del BOE el 2026-11-12: publicado en el BOE núm. 92, de 16 de abril de 2025; vigencia hasta el 31 de diciembre de 2027. Las tablas de 2026 están en el anexo I (artículo 27.3) y se han comprobado (ver salarios).
- **Cotización a la Seguridad Social 2026** (Orden PJC/297/2026, de 30 de marzo):
  - Indefinido, empresa: contingencias comunes 23,60 %, desempleo 5,50 %, MEI 0,75 %, FOGASA 0,20 %, formación profesional 0,60 %. Total **30,65 %**, más accidentes de trabajo según el sector.
  - Duración determinada, empresa: desempleo sube a 6,70 %, por lo que el total de la empresa pasa a **31,85 %**.
  - Trabajador: contingencias comunes 4,70 %, desempleo 1,55 %, MEI 0,15 %, formación profesional 0,10 %. Total **6,50 %**.
  - Contratos de menos de 30 días: cotización adicional de 33,62 € a cargo de la empresa al terminar el contrato.
  - Orden PJC/297/2026, de 30 de marzo (BOE núm. 79, de 31 de marzo de 2026, BOE-A-2026-7296). Cifras comprobadas en el texto del BOE el 2026-11-12 (artículos 4, 16 y 33.2).
- **Salarios:** salen de la tabla del anexo I del convenio para 2026. El nivel más bajo es el grupo E, nivel 2, área 2: salario base anual 13.952,29 €, plus convenio 3.120,99 €, total 17.073,28 € al año (comprobado en el BOE el 2026-11-12). El anexo no indica importes mensuales ni número de pagas: **[COMPROBAR]** antes de expresarlo al mes.

## 6. Recursos, costes y previsión económica
Separando construcción y mantenimiento:

| Concepto | Construcción | Mantenimiento y soporte |
|---|---|---|
| Horas de desarrollo | **[COMPROBAR]** sacar del Gantt de SABITECH, sumando las semanas de cada área por su dedicación | **[DECIDIR]** horas al mes de mantenimiento |
| Personal | Coste según convenio y cotización (apartado 5) | Soporte de eventos |
| Herramientas | Repositorio y entorno de desarrollo (gratuitos o de bajo coste) **[COMPROBAR]** | Correo de confirmaciones: servicio de correo transaccional de bajo volumen **[COMPROBAR precio y fecha de consulta]** |
| Alojamiento | Entorno de pruebas, gratuito o de bajo coste *(propuesta)* **[COMPROBAR precio]** | Servidor, base de datos y dominio, financiado con la cuota **[COMPROBAR precio]** |

**Modelo de ingresos (según la validación real; decidido por Alberto el 2026-11-12):** gratis para eventos pequeños; cuota mensual cuando se necesita control de aforo, reservas y estadísticas; soporte rápido el día del evento. Las cantidades concretas **[DECIDIR]** se fijan cuando estén estimados los costes, no antes.

**Viabilidad:** **[FALTA]** conclusión, cuando estén los costes cerrados: cuántos eventos y usuarios hacen falta para cubrir la cuota.

## 7. Recursos, financiación y agentes del entorno
- **Recursos para empezar:** equipos de los socios, repositorio y herramientas gratuitas, y el entorno de pruebas. **[COMPROBAR]** el coste de cada uno.
- **Financiación proporcionada al tamaño:** aportación de los socios al capital y, si hace falta, un préstamo pequeño. **[DECIDIR]** la cantidad.
- **Agentes externos:**
  - Organización de la jornada: cliente y fuente de validación.
  - Proveedor de alojamiento: servidor y base de datos.
  - Proveedor de correo: envío de confirmaciones.

## 8. Validación inicial de la idea
**Registro (personas reales; no se inventa ninguna respuesta):**
- **2026-11-06 · organizador de eventos** (persona real, sin nombre en este documento). Se le enseñó el prototipo inicial del catálogo.
  - Problemas actuales: formularios de Google y Excel, registro manual, duplicados y aforo superado, y control de asistencia difícil.
  - Prioridades: 1) no superar el aforo, 2) controlar la entrada, 3) reserva rápida.
  - Quiere ver título, fecha, hora, lugar y plazas libres. Le confunde tener muchos pasos o no saber si la reserva está completa.
  - Control de acceso con móvil o tablet leyendo QR.
  - Precio: gratis para eventos pequeños, cuota mensual si hay control de aforo, reservas y estadísticas. Espera soporte rápido el día del evento.

**Cambios que hace el proyecto tras esta validación:**
1. Fecha, hora y lugar en cada charla.
2. Confirmación clara tras reservar.
3. Reserva en dos pasos como máximo.
4. Control de aforo y duplicados en servidor.
5. Pantalla de acceso con QR para móvil.
6. Modelo de ingresos con una parte gratuita y soporte el día del evento.

- **2026-11-17 · asistente a jornadas** (compañero de 2.º DAW; persona real, sin nombre en este documento). Se le explicó el proyecto y se le enseñaron el catálogo y el botón de reservar.
  - Cómo se apunta hoy: formulario de Google o página web, eligiendo las charlas; después recibió una confirmación por correo.
  - Problemas: saber cuántas plazas quedan y evitar duplicados; con gestión manual es fácil superar el aforo sin darse cuenta.
  - Cuando se llena una charla: se revisa el listado de inscritos y se deja de aceptar gente; si alguien cancela, se avisa a otra persona.
  - Control de entrada: lista de inscritos o códigos QR. Lo más difícil es que nadie entre dos veces y que no entre nadie sin reserva.
  - Sobre el prototipo: catálogo sencillo, con horario, descripción y plazas disponibles en cada charla; botón de reservar bien visible y confirmación después de reservar.
  - Precio: gratis para eventos pequeños y cuota mensual económica para organizaciones con muchos eventos. Ve como clientes a centros educativos y empresas.
  - **Sesgo a tener en cuenta:** es compañero de clase y conoce el proyecto, así que su opinión es la de un usuario asistente, no la de un organizador.

**Qué confirma y qué cambia esta segunda validación:**
1. Confirma la prioridad del control de aforo y de duplicados en el servidor, que ya está en la API.
2. Confirma que cada charla debe mostrar horario y plazas libres, y la confirmación tras reservar, que ya se muestran.
3. Confirma el modelo de ingresos: gratis para eventos pequeños y cuota mensual.
4. Propone avisar a otra persona cuando alguien cancela (lista de espera). Queda **fuera del alcance** del checkpoint, como dicen los requisitos, y se anota como mejora para más adelante.
5. Añade centros educativos como posible cliente, que ya estaba previsto como ampliación.

- **2026-11-17 · organizador de jornadas locales** (familiar de Alberto; persona real, sin nombre en este documento). Organizó en primavera una jornada de tres charlas sobre comercio local. Se le explicó el proyecto y se le enseñaron el catálogo y el botón de reservar.
  - Cómo se apunta hoy la gente: formulario de Google enviado por WhatsApp y correo, pero la mitad se apunta por otros canales (llamadas, mensajes personales, a través de otra persona). Acaba juntando a mano un Excel, el formulario y notas del móvil la víspera. Encontró a una persona apuntada tres veces con tres correos distintos.
  - Problema principal: los duplicados y no tener una cifra fiable de plazas libres. Las inscripciones en sí no le cuestan.
  - Cuando se llena una charla: se entera tarde, contando filas; a veces ya ha confirmado gente de más y tiene que llamar para decir que no hay sitio. Lleva una lista de espera improvisada en una libreta.
  - Control de entrada: lista impresa y bolígrafo. Lo difícil es quien no aparece porque se apuntó por otro canal, nombres parecidos y la cola. Un QR le parecería cómodo si puede usar su móvil, sin comprar ningún aparato.
  - Sobre el prototipo: ver claro cuántas plazas quedan ("quedan 12", "últimas 3"); cuando esté llena, que el botón diga "Completa" y no solo se ponga gris; ver hora, sala y ponente en la tarjeta sin entrar; que el botón diga "Reservar plaza" y que después haya una confirmación clara; aviso si alguien reserva dos charlas que se solapan.
  - Precio: no pagaría por un evento pequeño (30-40 personas). Le parecería justo gratis hasta cierto número de asistentes y, a partir de ahí, una cuota fija por evento, no una suscripción mensual, porque organiza pocas jornadas al año. No le gustan las comisiones por inscrito.
  - **Sesgo a tener en cuenta:** es familiar de Alberto.

**Qué confirma y qué cambia esta tercera validación:**
1. Confirma que el problema principal es el aforo y los duplicados, y que la API debe controlarlos en el servidor, como ya hace.
2. Confirma el QR desde el móvil, sin aparatos, para el control de entrada (diseñado para febrero).
3. **Cambios en la interfaz que propone el proyecto:** texto "Reservar plaza" en el botón, estado "Completa" con texto (no solo color), plazas libres visibles en la tarjeta, y hora, sala y ponente en el catálogo sin entrar al detalle.
4. **Cambio en el modelo de ingresos [DECIDIR]:** además de la cuota mensual, ofrecer una **cuota fija por evento** para organizadores que hacen pocas jornadas al año, gratis por debajo de un número de asistentes y sin comisión por inscrito.
5. Lista de espera y aviso de charlas solapadas: fuera del alcance del checkpoint; se anotan como mejoras para más adelante.

## 9. Organización del equipo
Responsabilidad, comunicación y resolución de desacuerdos **[DECIDIR]**: quién decide en cada área, dónde se habla (el grupo y las revisiones del repositorio) y cómo se resuelve un desacuerdo.

## 10. Uso de herramientas de IA
Este apartado se ha preparado con ayuda de IA. Lo que hizo la IA y lo que hizo el equipo está detallado en el informe de IA del proyecto **[FALTA]**. Todas las fuentes se han comprobado en su origen antes de entregar.

## Referencias (formato APA 7)
Las referencias se completan cuando cada dato esté comprobado **[FALTA]**. Las que se necesitan son:
- Ley 18/2022, de 28 de septiembre, de creación y crecimiento de empresas. BOE-A-2022-15818.
- Real Decreto Legislativo 2/2015, de 23 de octubre, por el que se aprueba el texto refundido de la Ley del Estatuto de los Trabajadores. Boletín Oficial del Estado (artículo 15, comprobado el 2026-11-16).
- Convenio colectivo estatal de empresas de consultoría, tecnologías de la información y estudios de mercado y de la opinión pública (XIX). Resolución de 4 de abril de 2025, BOE de 16 de abril de 2025, BOE-A-2025-7766.
- Orden PJC/297/2026, de 30 de marzo, por la que se establecen las bases de cotización y los tipos de cotización a la Seguridad Social para 2026. BOE-A-2026-7296, de 31 de marzo de 2026.
