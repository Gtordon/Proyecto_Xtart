# Umbral Labs SL: apartado empresarial (IPE II)

> Borrador del apartado empresarial del checkpoint de SABITECH WEB.
> Preparado con ayuda de IA. Ese uso queda declarado en el informe de IA del proyecto.
> **[DECIDIR]** = pendiente de decisión del equipo. **[COMPROBAR]** = pendiente de confirmar en fuente oficial. **[FALTA]** = dato o documento que todavía no existe. No hay ninguna cifra inventada.

## 1. La empresa y la necesidad que cubre

**Umbral Labs SL** es una empresa ficticia que ofrece SABITECH como servicio a quien organiza jornadas, charlas y talleres. Cubre un problema concreto: organizar la inscripción y la asistencia sin formularios sueltos ni hojas de cálculo.

La necesidad sale de la validación con una persona real que organiza eventos (apartado 8): gestiona las reservas con formularios de Google y Excel, con registro manual, duplicados, aforo superado y un control de asistencia difícil.

**Clientes:** organizadores de charlas con plazas limitadas, sobre todo jornadas tecnológicas. Es el público de la persona que validó la idea. Otros públicos, como centros educativos o asociaciones, quedan como ampliación futura.

## 2. Propuesta de valor

Cada beneficio se corresponde con una función de SABITECH que se puede comprobar en la demo:

- **Catálogo claro:** título, fecha, hora, lugar y plazas libres de cada charla, que es lo que pidió la persona validada.
- **Reserva rápida:** dos pasos como máximo, con confirmación clara de que la plaza está reservada.
- **Aforo y duplicados controlados en el servidor:** no se puede superar el aforo ni reservar dos veces la misma charla.
- **Control de asistencia con QR temporal:** el QR se renueva cada 30 segundos y se valida en el servidor, desde móvil o tablet.

## 3. Tipo de empresa y forma jurídica

**Sociedad de Responsabilidad Limitada (SL), con tres socios.**

- Responsabilidad limitada al capital aportado, adecuada para un proyecto de tres socios.
- Capital mínimo de 1 euro, que establece la Ley 18/2022, de creación y crecimiento de empresas (BOE-A-2022-15818), al modificar el artículo 4 de la Ley de Sociedades de Capital.
- Se descartan, de momento, el autónomo (responsabilidad ilimitada, con tres personas) y la sociedad anónima (capital y trámites desproporcionados para el tamaño previsto). **[COMPROBAR]** que la justificación se sostiene con la fuente.

## 4. Organigrama

Tres socios-administradores, que coinciden con el reparto del proyecto:

- **Backend y datos:** API, reservas, aforo, correo y QR en servidor.
- **Frontend y gestión:** aplicación web en React y la parte administrativa y económica.
- **Diseño y digitalización:** interfaz, accesibilidad y organización de la información.

En el futuro, una persona de **soporte el día del evento**, que pidió la persona validada.

## 5. Plan de personal y contratación

| Puesto | Funciones | Dedicación | Contratación |
|---|---|---|---|
| Socio de backend | API, base de datos, seguridad | 10-12 h/semana en desarrollo; menos en mantenimiento | Socio-administrador |
| Socio de frontend y gestión | Aplicación web, administración | 10-12 h/semana en desarrollo; menos en mantenimiento | Socio-administrador |
| Socio de diseño | Interfaz, accesibilidad, digitalización | 10-12 h/semana en desarrollo; menos en mantenimiento | Socio-administrador |
| Soporte de eventos | Atención el día del evento | Por eventos | Contrato temporal **[COMPROBAR]** |

**Causa de la contratación temporal:** el soporte se necesita solo los días de evento, así que es una necesidad temporal y no permanente. La modalidad exacta (contrato por circunstancias de la producción, u otra) **[COMPROBAR]** en el artículo 15 del Estatuto de los Trabajadores (Real Decreto Legislativo 2/2015) y en el convenio.

- **Convenio aplicable:** XIX Convenio colectivo estatal de empresas de consultoría, tecnologías de la información y estudios de mercado y de la opinión pública (BOE-A-2025-7766, de 16 de abril de 2025; vigencia hasta el 31 de diciembre de 2027). Las tablas de 2026 están en el anexo I (artículo 27.3).
- **Cotización a la Seguridad Social 2026** (Orden PJC/297/2026, de 30 de marzo):
  - Indefinido, empresa: contingencias comunes 23,60 %, desempleo 5,50 %, MEI 0,75 %, FOGASA 0,20 %, formación profesional 0,60 %. Total **30,65 %**, más accidentes de trabajo según el sector.
  - Duración determinada, empresa: desempleo sube a 6,70 %, por lo que el total de la empresa pasa a **31,85 %**.
  - Trabajador: contingencias comunes 4,70 %, desempleo 1,55 %, MEI 0,15 %, formación profesional 0,10 %. Total **6,50 %**.
  - Contratos de menos de 30 días: cotización adicional de 33,62 € a cargo de la empresa al terminar el contrato.
- **Salarios:** salen de la tabla del anexo I del convenio para 2026. El nivel más bajo es el grupo E, nivel 2, área 2: salario base anual 13.952,29 €, plus convenio 3.120,99 €, total 17.073,28 € al año. El anexo no indica importes mensuales ni número de pagas: **[COMPROBAR]** antes de expresarlo al mes.

## 6. Recursos, costes y previsión económica

Separando construcción y mantenimiento:

| Concepto | Construcción | Mantenimiento y soporte |
|---|---|---|
| Horas de desarrollo | **[COMPROBAR]** sacar del Gantt de SABITECH, sumando las semanas de cada área por su dedicación | **[DECIDIR]** horas al mes de mantenimiento |
| Personal | Coste según convenio y cotización (apartado 5) | Soporte de eventos |
| Herramientas | Repositorio y entorno de desarrollo (gratuitos o de bajo coste) **[COMPROBAR]** | Correo de confirmaciones: servicio de correo transaccional de bajo volumen **[COMPROBAR precio y fecha de consulta]** |
| Alojamiento | Entorno de pruebas, gratuito o de bajo coste **[COMPROBAR precio]** | Servidor, base de datos y dominio, financiado con la cuota **[COMPROBAR precio]** |

**Modelo de ingresos:** gratis para eventos pequeños; cuota mensual cuando se necesita control de aforo, reservas y estadísticas; soporte rápido el día del evento. Las cantidades concretas **[DECIDIR]** se fijan cuando estén estimados los costes.

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

**Pendiente:** al menos una persona real más. **[FALTA]** anotar cada respuesta con fecha.

## 9. Organización del equipo

Responsabilidad, comunicación y resolución de desacuerdos **[DECIDIR]**: quién decide en cada área, dónde se habla (el grupo y las revisiones del repositorio) y cómo se resuelve un desacuerdo.

## 10. Uso de herramientas de IA

Este apartado se ha preparado con ayuda de IA. Lo que hizo la IA y lo que hizo el equipo está detallado en el informe de IA del proyecto **[FALTA]**. Las fuentes se han comprobado en su origen antes de entregar.

## Referencias (APA 7)

- Convenio colectivo estatal de empresas de consultoría, tecnologías de la información y estudios de mercado y de la opinión pública (XIX). Resolución de 4 de abril de 2025. Boletín Oficial del Estado, 92, de 16 de abril de 2025. BOE-A-2025-7766.
- Ley 18/2022, de 28 de septiembre, de creación y crecimiento de empresas. Boletín Oficial del Estado, 234, de 29 de septiembre de 2022. BOE-A-2022-15818.
- Orden PJC/297/2026, de 30 de marzo, por la que se desarrollan las normas legales de cotización a la Seguridad Social, desempleo, protección por cese de actividad, Fondo de Garantía Salarial y formación profesional para el ejercicio 2026. Boletín Oficial del Estado, 79, de 31 de marzo de 2026. BOE-A-2026-7296.
- Real Decreto Legislativo 2/2015, de 23 de octubre, por el que se aprueba el texto refundido de la Ley del Estatuto de los Trabajadores. **[COMPROBAR]** el artículo 15.
