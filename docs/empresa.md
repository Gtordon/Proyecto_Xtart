# Umbral Labs SL — apartado empresarial (IPE II)

> Documento de trabajo del equipo para la memoria de SABITECH WEB. Las cifras marcadas como estimación son valoraciones del equipo, no datos medidos. **[COMPROBAR]** = hay que confirmarlo en la fuente oficial antes de entregar. **[FALTA]** = dato o documento que todavía no existe.

## 1. La empresa y la necesidad que cubre
**Umbral Labs SL** es una empresa ficticia que ofrece SABITECH como servicio a quienes organizan jornadas, charlas y talleres. Cubre un problema concreto: gestionar la inscripción y la asistencia sin formularios sueltos ni hojas de cálculo.

La necesidad sale de hablar con tres personas reales. El 6 de noviembre, un organizador de eventos gestiona las reservas con formularios de Google y Excel, con registro manual, duplicados, aforo superado y un control de asistencia difícil. El 17 de noviembre se habló con un compañero que asiste a jornadas y con un organizador de jornadas locales. Las tres personas coinciden en que lo más difícil es controlar el aforo y los duplicados. El segundo entrevistado es compañero de clase y el tercero es familiar de uno de los socios, así que sus opiniones se tratan con esa limitación.

**Clientes:** organizadores de charlas con plazas limitadas, sobre todo jornadas tecnológicas, que es el público de la primera persona entrevistada. Centros educativos y asociaciones quedan como ampliación futura.

## 2. Propuesta de valor
Cada beneficio se corresponde con una función de SABITECH que se puede comprobar en la demo:
- **Catálogo claro:** título, fecha, hora, lugar y plazas libres de cada charla.
- **Reserva rápida:** dos pasos como máximo, con confirmación clara de que la plaza está reservada.
- **Aforo y duplicados controlados en el servidor:** no se puede superar el aforo ni reservar dos veces la misma charla.
- **Control de asistencia con QR temporal:** el QR se renueva cada 30 segundos y se valida en el servidor, desde móvil o tablet. Diseñado para febrero, no implementado en el checkpoint.

## 3. Tipo de empresa y forma jurídica
**Sociedad de Responsabilidad Limitada (SL), con tres socios.**
- Responsabilidad limitada al capital aportado, adecuada para un proyecto de tres socios.
- Capital mínimo de 1 euro, que establece la Ley 18/2022, de creación y crecimiento de empresas (BOE-A-2022-15818), al modificar el artículo 4 de la Ley de Sociedades de Capital. Comprobado en el texto del BOE el 2026-11-12.
- Se descartan el autónomo (responsabilidad ilimitada, con tres personas) y la sociedad anónima (capital y trámites desproporcionados para el tamaño previsto). **[COMPROBAR]** que la justificación se sostiene con la fuente.

## 4. Organigrama (propuesta)
**Socios-administradores (los tres promotores):** deciden la estrategia, responden de la sociedad y firman las cuentas.

**Plantilla de la empresa (puestos ficticios, no los socios):**
- **Responsable técnico de backend y datos:** API, reservas, aforo, correo y QR en servidor.
- **Responsable de frontend:** aplicación web en React y mantenimiento de la interfaz.
- **Responsable de diseño y accesibilidad:** interfaz, guía de estilo y organización de la información.
- **Soporte de eventos (temporal):** atención el día del evento, que pidió la persona validada.

## 5. Plan de personal y contratación
| Puesto | Funciones | Dedicación | Contratación |
|---|---|---|---|
| Socio de backend | API, base de datos, seguridad | 10-12 h/semana en desarrollo; 10 h al mes en mantenimiento | Socio-administrador |
| Socio de frontend y gestión | Aplicación web, administración | 10-12 h/semana en desarrollo; 10 h al mes en mantenimiento | Socio-administrador |
| Socio de diseño | Interfaz, accesibilidad, digitalización | 10-12 h/semana en desarrollo; 10 h al mes en mantenimiento | Socio-administrador |
| Soporte de eventos | Atención el día del evento | Por eventos | Contrato temporal |

**Causa de la contratación temporal:** el soporte se necesita solo los días de evento. Según el artículo 15 del Estatuto de los Trabajadores (Real Decreto Legislativo 2/2015), la causa más ajustada es **obra o servicio determinado**, porque cada evento tiene una duración limitada. Decidido por el equipo el 2026-11-18.

- **Convenio aplicable:** XIX Convenio colectivo estatal de empresas de consultoría, tecnologías de la información y estudios de mercado y de la opinión pública (BOE-A-2025-7766, de 16 de abril de 2025, vigencia 2025-2027). Comprobado en el texto del BOE el 2026-11-18. El artículo 20.1 fija la jornada máxima anual en 1.800 horas.
- **Cotización a la Seguridad Social 2026** (Orden PJC/297/2026, de 30 de marzo, BOE-A-2026-7296):
  - Indefinido, empresa: contingencias comunes 23,60 %, desempleo 5,50 %, MEI 0,75 %, FOGASA 0,20 %, formación profesional 0,60 %. Total **30,65 %**, más accidentes de trabajo según el sector.
  - Duración determinada, empresa: desempleo sube a 6,70 %, por lo que el total de la empresa pasa a **31,85 %**.
  - Trabajador: contingencias comunes 4,70 %, desempleo 1,55 %, MEI 0,15 %, formación profesional 0,10 %. Total **6,50 %**.
  - Contratos de menos de 30 días: cotización adicional de 33,62 € a cargo de la empresa al terminar el contrato.
- **Salario de referencia:** grupo E, nivel 2, área 2 del anexo I para 2026: salario base anual 13.952,29 €, plus convenio 3.120,99 €, total **17.073,28 € al año**. El artículo 27.1 fija el salario en cómputo anual en 14 pagas, es decir, **1.219,52 € brutos al mes** por paga. Comprobado en el BOE el 2026-11-18.

## 6. Recursos, costes y previsión económica
Separando construcción y mantenimiento:

| Concepto | Construcción | Mantenimiento y soporte |
|---|---|---|
| Horas de trabajo | **Checkpoint: unas 98 horas** (49 días-persona del Gantt × 2 horas por día). **Febrero: unas 55 horas** (estimación, rango 44-62: correo 8-12 h; QR 12-16 h; pantalla de asistencia 10-14 h; pruebas automáticas 8-12 h; estilos finales y revisión en móvil 6-8 h). | 10 horas al mes |
| Valor del trabajo de los socios | 153 horas × 9,49 €/hora = **unos 1.451 €**. Cálculo: 17.073,28 € entre 1.800 horas anuales. Los socios no cobran salario fijo; esta cifra valora el trabajo aportado. | Unos 95 € al mes (10 horas × 9,49 €) |
| Personal de soporte | Según el salario de referencia (apartado 5), solo por días de evento | Soporte de eventos |
| Herramientas | Repositorio y entorno de desarrollo, gratuitos | Correo de confirmaciones: según fuentes de terceros, plan gratuito de 3.000 correos al mes y plan Pro de unos 20 $ al mes. **[COMPROBAR en la web oficial de Resend]** |
| Alojamiento | Entorno de pruebas, gratuito o de bajo coste | Servidor en Hetzner, unos 5 € al mes con la IP pública. **[COMPROBAR en la consola de Hetzner; el plan CX22 ya no se vende]**. Dominio .es en OVHcloud: 6,99 € más IVA al año según su web oficial. Servidor y dominio suman unos 70 € al año, financiados con la cuota. |

**Modelo de ingresos (decidido por el equipo el 2026-11-18):** gratis hasta 50 asistentes por evento; cuota fija por evento de 29 € para eventos de más de 50 asistentes, sin comisión por inscrito; y cuota mensual de 19 € para quien organiza muchos eventos, con aforo, reservas y estadísticas. Propuesta de partida, sin precios de mercado comprobados.

**Viabilidad (borrador):** mantenimiento unos 95 € al mes, servidor y dominio unos 6 € al mes: en total unos 101 € al mes. Con una cuota mensual de 19 €, hacen falta unas 6 organizaciones suscritas para cubrirlo. Conclusión pendiente de confirmar el precio del servidor en la consola de Hetzner.

## 7. Recursos, financiación y agentes del entorno
- **Recursos para empezar:** equipos de los socios, repositorio y herramientas gratuitas, y el entorno de pruebas.
- **Financiación proporcionada al tamaño:** aportación de los socios al capital, con el mínimo legal de 1 euro (Ley 18/2022). No se prevé préstamo de momento. Decidido por el equipo el 2026-11-18.
- **Agentes externos:**
  - Organización de la jornada: cliente y fuente de validación.
  - Proveedor de alojamiento: servidor y base de datos (Hetzner) y dominio (OVHcloud).
  - Proveedor de correo: envío de confirmaciones (Resend).

## 8. Validación inicial de la idea
**Registro (personas reales; no se inventa ninguna respuesta):**

- **2026-11-06 · organizador de eventos** (persona real, sin nombre en este documento). Se le enseñó el prototipo inicial del catálogo.
  - Problemas actuales: formularios de Google y Excel, registro manual, duplicados y aforo superado, y control de asistencia difícil.
  - Prioridades: 1) no superar el aforo, 2) controlar la entrada, 3) reserva rápida.
  - Quiere ver título, fecha, hora, lugar y plazas libres. Le confunde tener muchos pasos o no saber si la reserva está completa.
  - Control de acceso con móvil o tablet leyendo QR.
  - Precio: gratis para eventos pequeños, cuota mensual si hay control de aforo, reservas y estadísticas. Espera soporte rápido el día del evento.

- **2026-11-17 · asistente a jornadas** (compañero de 2.º DAW; persona real, sin nombre en este documento). Se le explicó el proyecto y se le enseñaron el catálogo y el botón de reservar.
  - Cómo se apunta hoy: formulario de Google o página web, eligiendo las charlas; después recibió una confirmación por correo.
  - Problemas: saber cuántas plazas quedan y evitar duplicados; con gestión manual es fácil superar el aforo sin darse cuenta.
  - Cuando se llena una charla: se revisa el listado de inscritos y se deja de aceptar gente; si alguien cancela, se avisa a otra persona.
  - Control de entrada: lista de inscritos o códigos QR. Lo más difícil es que nadie entre dos veces y que no entre nadie sin reserva.
  - Precio: gratis para eventos pequeños y cuota mensual económica para organizaciones con muchos eventos. Ve como clientes a centros educativos y empresas.
  - **Sesgo a tener en cuenta:** es compañero de clase y conoce el proyecto, así que su opinión es la de un usuario asistente, no la de un organizador.

- **2026-11-17 · organizador de jornadas locales** (familiar de uno de los socios; persona real, sin nombre en este documento). Organizó en primavera una jornada de tres charlas sobre comercio local. Se le explicó el proyecto y se le enseñaron el catálogo y el botón de reservar.
  - Cómo se apunta hoy la gente: formulario de Google enviado por WhatsApp y correo, pero la mitad se apunta por otros canales. Acaba juntando a mano un Excel, el formulario y notas del móvil la víspera. Encontró a una persona apuntada tres veces con tres correos distintos.
  - Problema principal: los duplicados y no tener una cifra fiable de plazas libres.
  - Cuando se llena una charla: se entera tarde, contando filas, y a veces tiene que llamar para decir que no hay sitio. Lleva una lista de espera improvisada en una libreta.
  - Control de entrada: lista impresa y bolígrafo. Un QR le parecería cómodo si puede usar su móvil, sin comprar ningún aparato.
  - Sobre el prototipo: ver claro cuántas plazas quedan; que el botón diga "Completa" cuando esté llena; ver hora, sala y ponente en la tarjeta; que el botón diga "Reservar plaza" y que después haya una confirmación clara; aviso si alguien reserva dos charlas que se solapan.
  - Precio: no pagaría por un evento pequeño (30-40 personas). Le parecería justo gratis hasta cierto número de asistentes y, a partir de ahí, una cuota fija por evento, no una suscripción mensual. No le gustan las comisiones por inscrito.
  - **Sesgo a tener en cuenta:** es familiar de uno de los socios.

**Qué cambia el proyecto tras la validación:**
1. Fecha, hora y lugar en cada charla.
2. Confirmación clara tras reservar.
3. Botón «Reservar plaza» y estado «Completa» con texto, no solo con color.
4. Plazas libres visibles en la tarjeta de cada charla.
5. Control de aforo y duplicados en el servidor.
6. Pantalla de acceso con QR para móvil (febrero).
7. Modelo de ingresos con una parte gratuita, cuota fija por evento y cuota mensual, y soporte el día del evento.

Lista de espera y aviso de charlas solapadas: fuera del alcance del checkpoint; se anotan como mejoras para más adelante.

## 9. Organización del equipo
Se mantiene el reparto del 6 de noviembre: Alberto, frontend, IPE II e inglés; Guillermo, interfaces y digitalización; Joan, backend y base de datos. Las decisiones de este apartado las ha tomado el equipo, que ha dado vía libre para cerrarlas.

## 10. Uso de herramientas de IA
Este apartado se ha preparado con ayuda de IA. Lo que hizo la IA y lo que hizo el equipo está detallado en el registro de IA del proyecto (`docs/registro-ia.md`). Todas las fuentes se han comprobado en su origen antes de entregar.

## Referencias (formato APA 7)
- Gobierno de España. (2022). *Ley 18/2022, de 28 de septiembre, de creación y crecimiento de empresas*. Boletín Oficial del Estado. BOE-A-2022-15818.
- Gobierno de España. (2015). *Real Decreto Legislativo 2/2015, de 23 de octubre, por el que se aprueba el texto refundido de la Ley del Estatuto de los Trabajadores* (artículo 15). Boletín Oficial del Estado.
- Ministerio de Trabajo y Economía Social. (2025). *Resolución de 4 de abril de 2025, por la que se registra y publica el XIX Convenio colectivo estatal de empresas de consultoría, tecnologías de la información y estudios de mercado y de la opinión pública*. Boletín Oficial del Estado, 16 de abril de 2025. BOE-A-2025-7766.
- Ministerio de Inclusión, Seguridad Social y Migraciones. (2026). *Orden PJC/297/2026, de 30 de marzo, por la que se establecen las bases de cotización y los tipos de cotización a la Seguridad Social para 2026*. Boletín Oficial del Estado, 31 de marzo de 2026. BOE-A-2026-7296.
- OVHcloud. (2026). *Dominios .ES* [Página web]. https://www.ovhcloud.com/es-es/domains/tld/es/ [Precio de renovación pendiente de comprobar en la web oficial.]
- Hetzner Online GmbH. (2026). *Hetzner Cloud* [Página web]. https://www.hetzner.com/cloud [Precio vigente pendiente de comprobar en la consola.]
- Resend. (2026). *Pricing* [Página web]. https://resend.com/pricing [Pendiente de comprobar en la web oficial.]
