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

### Paso 4 · Tres productos del emprendimiento

| # | Producto | Precio |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |

### Paso 5 · Repositorio del equipo

| Integrante | Qué hizo en este laboratorio |
|---|---|
| Raúl Hinojoza | Se implementó y documentó el web component `<banner-promocion>`, incluyendo su plantilla, Shadow DOM, atributos observados (`descuento` y `codigo`) y slots personalizables. |
| | |
| | |
| | |

## Verificación

Marca con una `x` lo que ya comprobaste en el navegador.

- [ ] La etiqueta tiene guion.
- [ ] La página solo cambia lo que el componente expone con `var()`.
- [ ] `setAttribute` cambia el precio en pantalla.
- [ ] La consola no muestra errores.

Prueba que usamos en la consola:

```js
document.querySelector("tarjeta-producto").setAttribute("precio", "25");
```

Resultado que vimos:

## Reto extra (opcional)

- [ ] Atributo `destacado` que cambia el borde con `:host([destacado])`.

## Uso de inteligencia artificial

- Herramienta usada (o «ninguna»): Inteligencia artificial.
- Para qué la consultamos: Para consultar el código y apoyar la corrección de errores durante la implementación del web component `<banner-promocion>`.
- Qué cambiamos o comprobamos nosotros:

# Componentes-Emprendimiento
Propuesta de un 1 emprendimiento de libre elección y construcción de su interfaz con componentes web personalizados, encapsulados y reutilizables.
