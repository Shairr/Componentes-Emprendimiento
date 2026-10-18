# Café Raíz — Tostado Artesanal

| Información del Proyecto | Detalle |
|---|---|
| **Componente Web** | `<ficha-origen>` |
| **Integrante** | Fernando Camaton |
| **NRC** | 36643 |
| **Asignatura** | Programación Integrativa de Componentes Web |

---

## 1. Etiqueta registrada y cómo se importa el módulo

- **Nombre de la etiqueta:** `<ficha-origen>`
- **Clase exportada:** `FichaOrigen` en `./componentes/ficha-origen.js`
- **Importación en la página:**
  ```html
  <script type="module" src="./componentes/ficha-origen.js"></script>
  ```
 
> Se utiliza `type="module"` para ejecutar el archivo como módulo nativo ES6 de forma asíncrona, previniendo el bloqueo del renderizado del documento HTML. El nombre de la etiqueta incluye de forma obligatoria un guion "-" para acatar el estándar de la W3C sobre Custom Elements; esto garantiza que el navegador no colisione con elementos HTML nativos actuales ni futuros.

---

## 2. Slots usados, textos de respaldo y qué pasa sin `cloneNode(true)`

### Distribución de slots en `<ficha-origen>`

| Slot | Tipo | Elemento que recibe | Contenido de respaldo (*fallback*) |
|---|---|---|---|
| `slot="region"` | Nombrado | Nombre de la región cafetalera (ej. Loja, Intag, Galápagos) | `<h3 class="region-fallback">Origen: Sin especificar</h3>` |
| *(Por defecto)* | Sin nombre | Descripción sensorial o notas de cata del origen | `Café de especialidad 100% ecuatoriano.` |

### ¿Qué pasaría si no se usa `cloneNode(true)`?

La propiedad `template.content` contiene una referencia a un fragmento de documento `DocumentFragment` en memoria. Si se adjunta directamente al Shadow DOM con `this.shadowRoot.appendChild(template.content)` sin clonarlo:
1. El navegador **mueve** los nodos físicos del fragmento en lugar de duplicarlos.
2. La **primera instancia** del componente en pantalla tomaría todo el contenido de la plantilla.
3. Las **instancias posteriores** `#ficha-intag`, `#ficha-galapagos`, etc. quedarían completamente vacías y sin estructura visual.

---

## 3. Atributos observados, método que reacciona y variables CSS

### Atributos observados `observedAttributes`

| Atributo | Propósito | Tipo / Formato |
|---|---|---|
| `altitud` | Indica la altura de cultivo en metros sobre el nivel del mar | Numérico o texto (ej. `1500`, se formatea a `1500 msnm`) |
| `tueste` | Especifica el perfil de tostado del grano | Texto (ej. `Ligero`, `Medio`, `Oscuro`) |
| `intensidad` | Representa la escala de intensidad sensorial en taza | Escala (ej. `3/5`, `4/5`) |

### Método reactivo: `attributeChangedCallback`

```js
attributeChangedCallback(nombre, _valorAnterior, valorNuevo)
```

Al detectarse cualquier cambio en los atributos observados (mediante marcado HTML inicial, `setAttribute()` en JavaScript o asignación por propiedades `get`/`set`), el ciclo de vida reacciona automáticamente derivando la actualización:

- **`altitud`** ➔ Ejecuta `_actualizarAltitud(valorNuevo)`: Formatea el dato en el elemento `#altitud-display`, concatenando la unidad `"msnm"`.
- **`tueste`** ➔ Ejecuta `_actualizarTueste(valorNuevo)`: Actualiza el texto en `#tueste-display`.
- **`intensidad`** ➔ Ejecuta `_actualizarIntensidad(valorNuevo)`: Refleja el puntaje en `#intensidad-display`.

*Si un atributo se borra o recibe una cadena vacía, el valor visual se restaura a `"—"`.*

### Variables CSS del componente

El componente encapsula sus estilos en el Shadow DOM pero expone variables CSS con valores de respaldo predeterminados:

| Variable CSS | Elemento al que afecta | Valor de respaldo (*fallback*) |
|---|---|---|
| `--color-marca` | Acento superior de la tarjeta (`border-top: 5px solid`), color del título y de los iconos SVG | `#6f4e37` |
| `--color-superficie` | Fondo general de la tarjeta contenedora | `#ffffff` |
| `--color-texto` | Color de texto principal y etiquetas clave | `#2c1a0e` |
| `--fuente-display` | Tipografía serif estilizada aplicada al título de la región | `'Cormorant Garamond', Georgia, serif` |

---

## 4. Actividades realizadas dentro del proyecto

1. **Construcción del componente modular:** Se creó el archivo `./componentes/ficha-origen.js` con la plantilla HTML/CSS separada en memoria mediante `<template>` y la clase `FichaOrigen` extendiendo de `HTMLElement`.
2. **Encapsulación con Shadow DOM:** Se implementó `this.attachShadow({ mode: "open" })` y se realizó la clonación profunda del template con `cloneNode(true)`.
3. **Manejo de Slots y contenidos de reserva:** Se configuró el slot nombrado `region` y el slot principal sin nombre, asegurando que ambos muestren mensajes de respaldo coherentes ante la ausencia de contenido hijo.
4. **Reactividad completa con atributos sincronizados:**
   - Se registró `altitud`, `tueste` e `intensidad` en `static get observedAttributes()`.
   - Se programó el ciclo `attributeChangedCallback` junto a los métodos de ayuda `_actualizarAltitud()`, `_actualizarTueste()` y `_actualizarIntensidad()`.
   - Se sincronizó cada propiedad mediante `get` y `set` para permitir control reactivo tanto desde atributos HTML como desde propiedades del objeto DOM.
5. **Integración en la página `index.html`:** Se incorporaron las fichas para los tres orígenes ecuatorianos de Café Raíz:
   - **Loja:** 1 500 msnm · Tueste Medio · Intensidad 4/5
   - **Intag:** 1 800 msnm · Tueste Ligero · Intensidad 3/5
   - **Galápagos:** 350 msnm · Tueste Medio-Oscuro · Intensidad 4/5
6. **Pruebas dinámicas en consola del navegador:**
   ```js
   // Prueba de reactividad dinámica en tiempo real
   const fichaLoja = document.querySelector("#ficha-loja");
   fichaLoja.setAttribute("altitud", "2000");
   fichaLoja.setAttribute("tueste", "Oscuro");
   fichaLoja.setAttribute("intensidad", "5/5");
   ```
   *Resultado comprobado:* Los displays `#altitud-display`, `#tueste-display` e `#intensidad-display` actualizaron sus valores en pantalla de forma instantánea sin refrescar la página.

---

## 5. Declaración de uso de Inteligencia Artificial

- **Herramienta empleada:** Antigravity IDE (asistente de IA integrado).
- **Alcance del uso:** La inteligencia artificial fue empleada **principalmente en el desarrollo, pulido y maquetación visual mediante estilos CSS**:
  - **CSS interno del componente:** Diseño del bloque `<style>` de `<ficha-origen>` (paleta de colores café artesanal, bordes curvos, elevación con sombras suaves, marca de agua SVG decorativa y micro-interacción en hover `:host(:hover)`).
  - **Layout general:** Definición de la grilla responsiva `.origen-grid` en `estilos.css` para el correcto ajuste en múltiples resoluciones.
  - **Refactorización CSS:** Eliminación de reglas repetitivas, selectores no utilizados y optimización de variables CSS.
