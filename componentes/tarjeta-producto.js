// ============================================================
// tarjeta-producto.js  ·  Integrante 1 · Andres
// Etiqueta  : <tarjeta-producto>
// Clase     : TarjetaProducto
// Propósito : Mostrar las variedades de café del catálogo.
// ============================================================

// ── PASO 2 · Plantilla declarada UNA SOLA VEZ en el ámbito del módulo ──────
// Existe en memoria una sola vez; cada instancia recibe una COPIA con
// cloneNode(true). Si se insertara template.content sin clonar, el navegador
// MUEVE los nodos (no los copia): solo la última tarjeta tendría contenido.
const template = document.createElement("template");
template.innerHTML = `

  <!-- ── Wrapper de la imagen ── -->
  <!-- slot="foto"
       Texto de respaldo: emoji ☕ si no llega ninguna imagen.
       Sin cloneNode(true) todas las instancias compartirían el MISMO nodo
       y el slot sólo aparecería en la última tarjeta del DOM. -->
  <div class="foto-wrapper">
    <slot name="foto">
      <div class="foto-fallback" aria-hidden="true">Producto sin foto</div>
    </slot>
  </div>

  <!-- Insignia "DESTACADO": oculta por defecto, visible con :host([destacado]) -->
  <span class="insignia-destacado" aria-label="Producto destacado">⭐ Destacado</span>

  <!-- ── Cuerpo de la tarjeta ── -->
  <div class="cuerpo">

    <!-- slot="nombre"
         Texto de respaldo: "Producto sin nombre" si el slot está vacío. -->
    <slot name="nombre">
      <h3 class="nombre-fallback">Producto sin nombre</h3>
    </slot>

    <!-- Slot por defecto (sin atributo name) → descripción del producto.
         Texto de respaldo: aviso cuando no se proyecta nada. -->
    <div class="descripcion">
      <slot>Sin descripción disponible.</slot>
    </div>

    <!-- Precio reactivo: se actualiza en attributeChangedCallback -->
    <div class="precio-wrapper">
      <span class="etiqueta-precio">Precio</span>
      <span class="precio-display" id="precio-display">—</span>
    </div>

    <!-- Botón de acción -->
    <button class="btn-agregar" type="button" aria-label="Agregar al carrito">
      Agregar al carrito
    </button>

  </div>

  <!-- ── PASO 3 · Estilos encapsulados en el Shadow DOM ──────────────────────
       Las reglas CSS de aquí NUNCA filtran hacia la página ni al revés.
       Solo las Custom Properties (--var) cruzan la barrera porque el
       navegador las hereda a través del Shadow DOM por diseño de la spec. -->
  <style>
    /* Importar tipografía (intento; si falla, usa la del sistema) */
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap');

    /* ── :host ─ apunta al propio elemento <tarjeta-producto> ── */
    :host {
      display: block;           /* Sin esto el elemento es inline */
      position: relative;
      border-radius: 18px;
      overflow: hidden;
      background: #ffffff;
      box-shadow:
        0 2px 8px  rgba(111, 78, 55, 0.08),
        0 6px 24px rgba(111, 78, 55, 0.12),
        inset 0 0 0 2px rgba(111, 78, 55, 0.15);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      font-family: 'Outfit', 'Segoe UI', system-ui, sans-serif;
      color: var(--color-texto, #2c1a0e);
    }

    /* ── RETO EXTRA · :host([destacado]) ──────────────────────────────────
       Cuando el HTML incluye el atributo booleano "destacado", este selector
       se activa AUTOMÁTICAMENTE sin necesidad de JS extra.
       Variables CSS usadas: --color-marca (heredada de :root en la página). */
    :host([destacado]) {
      box-shadow:
        0 4px 12px rgba(111, 78, 55, 0.15),
        0 12px 36px rgba(111, 78, 55, 0.28),
        0 0 0 3px var(--color-marca, #6f4e37);
    }

    :host([destacado]) .insignia-destacado {
      display: inline-flex;   /* Muestra la insignia solo en destacados */
    }

    /* ── Hover ── */
    :host(:hover) {
      transform: translateY(-6px);
      box-shadow:
        0 8px 20px rgba(111, 78, 55, 0.18),
        0 18px 48px rgba(111, 78, 55, 0.25),
        inset 0 0 0 2px var(--color-marca, #6f4e37);
    }

    /* ── Foto ── */
    .foto-wrapper {
      width: 100%;
      aspect-ratio: 4 / 3;
      overflow: hidden;
      background: linear-gradient(135deg, #f5ede6 0%, #e8d5c4 100%);
      position: relative;
    }

    ::slotted([slot="foto"]) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }

    :host(:hover) ::slotted([slot="foto"]) {
      transform: scale(1.07);
    }

    .foto-fallback {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4.5rem;
      opacity: 0.35;
    }

    /* ── Insignia "Destacado" (oculta por defecto) ── */
    .insignia-destacado {
      display: none;
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      background: var(--color-marca, #6f4e37);
      color: #fff;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 0.28rem 0.65rem;
      border-radius: 20px;
      align-items: center;
      gap: 0.25rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.22);
      z-index: 1;
    }

    /* ── Cuerpo ── */
    .cuerpo {
      padding: 1.1rem 1.3rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }

    /* Slot nombre */
    ::slotted([slot="nombre"]) {
      margin: 0;
      color: var(--color-marca, #6f4e37);
      font-size: 1.18rem;
      font-weight: 700;
      letter-spacing: 0.01em;
    }

    .nombre-fallback {
      margin: 0;
      color: var(--color-marca, #6f4e37);
      font-size: 1.1rem;
      font-weight: 700;
    }

    /* Slot descripción (por defecto) */
    .descripcion {
      color: #6b5044;
      font-size: 0.91rem;
      line-height: 1.6;
    }

    /* ── Área de precio ──
       Variable CSS usada: --color-marca (heredada de la página). */
    .precio-wrapper {
      display: flex;
      align-items: baseline;
      gap: 0.45rem;
      margin-top: 0.3rem;
      padding-top: 0.7rem;
      border-top: 1px solid rgba(111, 78, 55, 0.12);
    }

    .etiqueta-precio {
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #a08070;
    }

    /* PASO 3 · Variable CSS --color-marca consumida por el precio.
       Si la página redefine --color-marca, el color cambia automáticamente. */
    #precio-display {
      font-size: 1.45rem;
      font-weight: 800;
      color: var(--color-marca, #6f4e37);
      line-height: 1;
      transition: color 0.2s ease;
    }

    /* ── Botón ── */
    .btn-agregar {
      margin-top: 0.5rem;
      padding: 0.65rem 1.2rem;
      background: var(--color-marca, #6f4e37);
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 0.88rem;
      font-weight: 600;
      font-family: inherit;
      letter-spacing: 0.03em;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
      width: 100%;
    }

    .btn-agregar:hover {
      background: #5a3d2b;
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(111, 78, 55, 0.35);
    }

    .btn-agregar:active {
      transform: translateY(0);
      box-shadow: none;
    }
  </style>
`;

// ── PASO 1 · Clase que define el comportamiento del componente ──────────────
export class TarjetaProducto extends HTMLElement {

  // PASO 3 · Lista de atributos que el navegador debe vigilar.
  // Sin esta lista, attributeChangedCallback NUNCA se ejecuta.
  static get observedAttributes() {
    // "precio"    → actualiza el texto del precio en pantalla
    // "destacado" → atributo booleano; el CSS (:host([destacado])) ya reacciona
    return ["precio", "destacado"];
  }

  constructor() {
    super(); // ← Obligatorio antes de cualquier otra instrucción

    // PASO 2 · Shadow DOM "open": JS externo puede leer shadowRoot (útil en pruebas)
    this.attachShadow({ mode: "open" });

    // PASO 2 · cloneNode(true) = clon PROFUNDO (deep clone): copia todos los nodos hijos.
    // Sin esto el navegador mueve el contenido de template.content al shadow root
    // y la plantilla quedará vacía para las instancias siguientes.
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // connectedCallback → se dispara cuando el elemento se inserta en el DOM
  connectedCallback() {
    if (this.hasAttribute("precio")) {
      this._actualizarPrecio(this.getAttribute("precio"));
    }
  }

  // PASO 3 · attributeChangedCallback → el navegador lo llama cuando un atributo
  // de observedAttributes cambia (incluida la carga inicial desde el HTML).
  // Parámetros: nombre del atributo, valor anterior, valor nuevo.
  attributeChangedCallback(nombre, _valorAnterior, valorNuevo) {
    if (nombre === "precio") {
      this._actualizarPrecio(valorNuevo);
    }
    // "destacado" no necesita lógica JS extra:
    // :host([destacado]) en el Shadow CSS reacciona de forma nativa.
  }

  // ── PASO 3 · Método que reacciona al cambio del atributo "precio" ──
  _actualizarPrecio(valor) {
    const display = this.shadowRoot?.getElementById("precio-display");
    if (!display) return; // Guard: shadow DOM podría no estar listo aún
    const num = parseFloat(valor);
    display.textContent = isNaN(num) || valor === null
      ? "—"
      : `$${num.toFixed(2)}`;
  }

  // ── Propiedad JS sincronizada con el atributo "precio" ──
  // tarjeta.precio        → devuelve el número
  // tarjeta.precio = 20   → llama setAttribute internamente
  get precio() {
    return parseFloat(this.getAttribute("precio")) || 0;
  }

  set precio(valor) {
    this.setAttribute("precio", valor);
  }

  // ── Propiedad para el atributo booleano "destacado" ──
  get destacado() {
    return this.hasAttribute("destacado");
  }

  set destacado(valor) {
    if (valor) {
      this.setAttribute("destacado", "");
    } else {
      this.removeAttribute("destacado");
    }
  }
}

// PASO 1 · Registrar la etiqueta personalizada en el registro global.
// El nombre DEBE contener guion (-) para no chocar con etiquetas HTML nativas.
customElements.define("tarjeta-producto", TarjetaProducto);
