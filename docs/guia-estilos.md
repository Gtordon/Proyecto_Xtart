# Guía de estilo · SABITECH WEB

Esta guía recoge las decisiones visuales de SABITECH WEB. Cada valor existe como variable al principio de `frontend/src/index.css`, así que la guía y la web no se pueden separar: si cambia una variable, cambia en todas las pantallas.

## 1. Identidad

| Elemento | Decisión |
|---|---|
| Nombre | **SABITECH WEB** es el producto; **SABITECH** son las jornadas |
| Empresa | **Umbral Labs**, la empresa ficticia del grupo, es la que desarrolla la web. Aparece como crédito ("Desarrollado por Umbral Labs", con "Labs" en azul) al pie de la barra lateral y del menú del móvil. El nombre de la web sigue siendo SABITECH para no mezclar las dos marcas |
| Símbolo | El arco y la puerta entreabierta de Umbral Labs, dibujado en SVG (`Marca` en `components/Piezas.jsx` y `public/favicon.svg`). Sobre el fondo marino el arco pasa a blanco |
| Colores | Los de Umbral Labs: azul marino `#0b1a3f` (el arco) y azul `#1d64f0` (la puerta) |
| Idea | Barra lateral en marino, como la versión oscura del logo. En el contenido, el azul a plena fuerza solo en lo pequeño (botón principal, enlaces, dato importante) y sus tonos pálidos en las zonas grandes. Superficies planas, bordes de 1 px y sin sombras en reposo |

## 2. Colores

Contraste calculado con la fórmula de WCAG 2.2. El mínimo AA es **4,5 a 1** en texto normal y **3 a 1** en elementos que no son texto (bordes de campos, anillo de foco, asientos).

### Barra lateral (marino)

| Variable | Valor | Uso |
|---|---|---|
| `--navy` | `#0b1a3f` | Fondo de la barra lateral |
| `--navy-raised` | `#15264f` | Enlace activo del menú |
| `--on-navy` | `#ffffff` | Texto sobre marino |
| `--on-navy-muted` | blanco al 62 % | Texto secundario sobre marino |
| `--on-navy-accent` | `#8bb2ff` | Iconos activos y anillo de foco sobre marino |

### Fondos y texto

| Variable | Valor | Uso |
|---|---|---|
| `--ground` | `#f5f7fb` | Fondo de la página |
| `--surface` | `#ffffff` | Tarjetas, campos y diálogos |
| `--raised` | `#eef2f8` | Fondos secundarios y asientos libres |
| `--border` | `#e1e6ef` | Bordes de tarjetas |
| `--rule` | `#eceff5` | Líneas entre filas |
| `--control` | `#7c8799` | Bordes de campos y botones secundarios |
| `--text` | `#0e1a33` | Texto principal |
| `--muted` | `#586178` | Texto secundario |

### Marca y estados

| Variable | Valor | Uso |
|---|---|---|
| `--accent` | `#1d64f0` | Botón principal, enlaces, foco y datos destacados |
| `--accent-hover` | `#1550c8` | Botón principal al pasar el ratón |
| `--accent-soft` | `#eef3ff` | Fondos pálidos de marca |
| `--accent-track` | `#d3e0fc` | Fondo de las barras de plazas |
| `--accent-ink` | `#102a6b` | Texto sobre fondos pálidos y asiento propio |
| `--positive` | `#247b50` | Éxito |
| `--negative` | `#c4242a` | Error |
| Asiento ocupado | `#6f8cc4` | Mapa de asientos |
| Píldoras | tinta y fondo por estado | Confirmada (verde), aviso (ámbar), neutra (gris), error (rojo), marca (azul) |

### Contrastes comprobados

| Combinación | Contraste | Resultado |
|---|---|---|
| Texto principal sobre blanco | 17,3 a 1 | Cumple |
| Texto principal sobre el fondo | 16,1 a 1 | Cumple |
| Texto secundario sobre blanco | 6,2 a 1 | Cumple |
| Texto secundario sobre el fondo | 5,8 a 1 | Cumple |
| Enlace azul sobre blanco | 5,1 a 1 | Cumple |
| Enlace azul sobre el fondo | 4,7 a 1 | Cumple |
| Texto blanco en el botón principal | 5,1 a 1 | Cumple |
| Texto blanco en el botón principal (hover) | 7,0 a 1 | Cumple |
| Texto blanco en la barra lateral | 17,0 a 1 | Cumple |
| Enlaces de la barra lateral | 12,5 a 1 | Cumple |
| Texto secundario en la barra lateral | 7,1 a 1 | Cumple |
| Enlace activo de la barra lateral | 14,8 a 1 | Cumple |
| Píldora "Confirmada" | 8,3 a 1 | Cumple |
| Píldora de aviso ("Última plaza") | 6,4 a 1 | Cumple |
| Píldora neutra ("Completa", "Cancelada") | 9,3 a 1 | Cumple |
| Píldora de marca ("Tu plaza") | 12,1 a 1 | Cumple |
| Texto de error de un campo | 5,8 a 1 | Cumple |
| Anillo de foco sobre blanco (no texto) | 5,1 a 1 | Cumple |
| Anillo de foco sobre marino (no texto) | 8,0 a 1 | Cumple |
| Borde de un campo sobre blanco (no texto) | 3,6 a 1 | Cumple |
| Asiento ocupado frente a libre (no texto) | 3,0 a 1 | Cumple |
| Asiento propio frente a ocupado (no texto) | 4,0 a 1 | Cumple |

Al revisar la guía vimos que el borde de los campos (1,5 a 1) y el asiento ocupado (1,2 a 1) no llegaban al mínimo. Se corrigieron cambiando `--control` y los colores de los asientos.

## 3. Tipografía

| Elemento | Valor |
|---|---|
| Familia | **DM Sans**, de Google Fonts, con licencia SIL Open Font License 1.1. Si no carga, se usa la fuente del sistema |
| Texto normal | 14 px (`--fs-body`), interlineado 1,5 |
| Texto pequeño | 12 px (`--fs-small`), para píldoras y etiquetas |
| Título de sección | 16 px (`--fs-section`) |
| Cifras grandes | 24 px (`--fs-kpi`) |
| Título de pantalla | 24 px en móvil, 28 px en tableta y 32 px en escritorio |
| Campos de formulario | 16 px, para que el móvil no amplíe la pantalla al escribir |
| Números | Cifras de ancho fijo (`tabular-nums`), para que las horas y las plazas queden alineadas |

## 4. Espacios y formas

| Variable | Valor | Uso |
|---|---|---|
| `--gap` | 24 px | Separación entre bloques |
| `--pad` | 20 px | Relleno interior de las tarjetas |
| `--radius-card` | 8 px | Esquinas de tarjetas |
| `--radius-control` | 6 px | Esquinas de botones, campos y mensajes |

## 5. Componentes

| Componente | Cómo es | Dónde se usa |
|---|---|---|
| Botón principal | Fondo azul y texto blanco, 40 px de alto; al pulsarlo se encoge un poco | Reservar, Entrar |
| Botón secundario | Fondo blanco con borde gris | Ver entrada, Entrar (sin sesión) |
| Botón pequeño | 32 px de alto | Botones dentro de las filas |
| Botón de icono | Solo icono, siempre con `aria-label` | Menú, Salir, Cerrar, Copiar enlace |
| Tarjeta | Caja blanca con borde de 1 px y esquinas de 8 px | Lista, panel "Tu jornada", detalle, formulario |
| Fila de charla | Hora, título, ponente y sala, barra de plazas y botón | Programa |
| Píldora de estado | Texto pequeño sobre fondo pálido; siempre con texto, nunca solo color | "Última plaza", "Completa", "Tu plaza", "Confirmada", "Cancelada" |
| Barra de plazas | El relleno es lo reservado; avanza con una transición al reservar | Filas del programa y aforo del día |
| Mapa de asientos | Un cuadrado por plaza: libre (gris claro), ocupado (azul grisáceo) y el tuyo (azul oscuro) | Detalle de una charla |
| Ficha de fecha | Día grande y mes corto | Detalle y Mis reservas |
| Mensaje | Franja con fondo pálido: verde si sale bien, rojo si falla | Resultado de reservar, errores de carga |
| Campo de formulario | Etiqueta visible encima, error debajo enlazado con `aria-describedby` | Entrar |
| Crédito de la empresa | "Desarrollado por Umbral Labs" en pequeño, con "Labs" en azul | Pie de la barra lateral y del menú del móvil |
| Iconos | Un solo juego, trazo de 1,5 px y 16 px, ocultos a los lectores de pantalla | Menú y botones |

## 6. Movimiento

Solo se animan `transform` y `opacity`, que no hacen que el navegador recalcule la página, y nada dura más de 300 ms.

| Animación | Duración |
|---|---|
| Pulsar un botón | 160 ms |
| Cambio de estado (filtros, colores) | 150 ms |
| Cambio de pantalla (fundido con leve subida) | 250 ms |
| El título de la charla viaja de la fila al detalle | 250 ms |
| Diálogo de la entrada | 200 ms al abrir y 150 ms al cerrar |
| Menú del móvil (entra por la derecha) | 300 ms |

Si el usuario tiene activado "reducir movimiento" en su sistema, se quitan los desplazamientos y quedan fundidos cortos.

## 7. Adaptación a pantallas

| Pantalla | Ancho | Qué cambia |
|---|---|---|
| Móvil | Hasta 759 px | Barra superior con el menú en una hoja lateral; filas apiladas; panel "Tu jornada" debajo de la lista |
| Tableta | Desde 760 px | Más margen; título de pantalla y resumen en dos columnas |
| Escritorio | Desde 1024 px | Barra lateral fija con el menú; lista y panel "Tu jornada" lado a lado |

Los estados al pasar el ratón solo se activan en dispositivos con ratón, para que en móvil no se queden "pegados" al tocar.

## 8. Accesibilidad aplicada

- `lang="es"` en la página.
- Todos los campos tienen su `<label>` y el error va enlazado al campo.
- El foco se ve siempre al navegar con el teclado (anillo azul de 2 px; azul claro sobre la barra marino).
- Los estados se dicen con texto, no solo con color.
- Los mensajes de error usan `role="alert"` y los de éxito `role="status"`, para que los lectores de pantalla los anuncien.
- Los diálogos usan el elemento nativo `<dialog>`: atrapan el foco y se cierran con Esc.
- Los botones que solo tienen icono llevan `aria-label`.