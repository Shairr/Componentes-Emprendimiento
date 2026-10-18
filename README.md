# Café Raíz — Tostado Artesanal

Componente Web: `<tarjeta-producto>`  
**Integrante:** Andres

---

### 1. Etiqueta registrada y cómo se importa el módulo

- **Etiqueta:** `<tarjeta-producto>`
- **Clase exportada:** `TarjetaProducto` en `./componentes/tarjeta-producto.js`
- **Cómo se importa:**
  ```html
  <script type="module" src="./componentes/tarjeta-producto.js"></script>
  ```
  Se usa `type="module"` para cargar el archivo como módulo de JavaScript sin bloquear el resto de la página. La etiqueta lleva un guion obligatorio (`-`) para cumplir con la regla de Web Components y no chocar con ninguna etiqueta nativa de HTML.

---

### 2. Slots usados, textos de respaldo y qué pasa sin `cloneNode(true)`

- **`slot="foto"`**: Recibe la imagen del café. Si no se le pasa ninguna, muestra `"Producto sin foto"`.
- **`slot="nombre"`**: Recibe el nombre del producto. Si no se pasa nada, muestra `"Producto sin nombre"`.
- **Slot por defecto (sin nombre)**: Recibe la descripción. Si viene vacío, muestra `"Sin descripción disponible."`.

**¿Qué pasaría si no se usa `cloneNode(true)`?**  
`template.content` guarda los elementos en memoria. Si usamos `appendChild(template.content)` sin clonar, el navegador no copia los elementos sino que los mueve. La primera tarjeta se quedaría con todo el contenido y las siguientes tarjetas aparecerían totalmente vacías.

---

### 3. Atributos observados, método que reacciona y variables CSS

- **Atributos observados:**
  - `precio`: Atributo dinámico que actualiza el precio en pantalla.
  - `destacado`: Atributo booleano extra que resalta la tarjeta con un borde y una insignia (`:host([destacado])`).
- **Método que reacciona al cambio:**  
  `attributeChangedCallback(nombre, _valorAnterior, valorNuevo)`  
  Cuando el atributo `precio` cambia (desde el HTML, con `setAttribute` o mediante la propiedad `.precio`), este método llama a `_actualizarPrecio(valor)` para formatear el número (`$X.XX`) y mostrarlo en `#precio-display`.
- **Variables CSS utilizadas:**
  - `--color-marca`: Aplica el color principal del café al borde, botón, precio y títulos. Tiene un respaldo `#6f4e37` por si no se define afuera.
  - `--color-texto`: Color base del texto con respaldo `#2c1a0e`.

---

### 4. Qué realicé dentro del repositorio del equipo

- Creé el archivo `./componentes/tarjeta-producto.js` con la clase `TarjetaProducto`, definiendo la plantilla fuera de la clase y usando Shadow DOM con `cloneNode(true)`.
- Configuré los slots con nombre (`foto`, `nombre`) y el slot de descripción, agregando sus contenidos de respaldo.
- Hice reactivo el precio usando `observedAttributes`, `attributeChangedCallback` y sincronizando la propiedad `tarjeta.precio` con getters y setters.
- Añadí el reto extra con `:host([destacado])` para que las tarjetas destacadas muestren una insignia y sombra llamativa sin meter código JS extra.
- Coloqué las 3 tarjetas de café (Espresso, Cold Brew y Granos) dentro del catálogo en `index.html`.
- Añadí las variables y el diseño responsive en `estilos.css` para que las tarjetas se organicen bien en cualquier tamaño de pantalla.
