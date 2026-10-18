// componentes/banner-promocion.js

// Plantilla reutilizable del web component <banner-promocion>.
// Define el estilo encapsulado, los slots personalizables y los elementos
// que mostrarán el descuento y el código de la promoción.
const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
      :host {
        display: block;
        overflow: hidden;
        position: relative;
        border-radius: 18px;
        box-sizing: border-box;
        color: var(--color-fondo);
        font-family: var(--fuente-base);
        background:
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E"),
          linear-gradient(110deg, var(--color-marca) 25%, var(--color-texto) 100%);
        background-size: 200px 200px, cover;
        background-blend-mode: overlay, normal;
        box-shadow:
          10px 10px 2px 1px  rgba(111, 78, 55, 0.08),
          inset 0px 0px 10px 10px rgba(111, 78, 55, 0.08);
      }

      .banner-prom {
        display: flex;
        width: 100%;
        padding: 40px 40px;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
      }

      #banner-prom__img {
        flex: 0 0 35%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px
      }

      img {
        max-width: 80%;
        height: auto;
        object-fit: contain;
      }

      .banner-prom__msg {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-left: 50px;
      }

      h2 {
        margin: 0;
        font-size: 3rem;
        font-weight: 800;
        text-transform: uppercase;
        line-height: 1.1;
      }

      p {
        margin: 0 0 20px 0;
        font-size: 1.1rem;
      }

      button {
        background-color: var(--color-acento);
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }

      button:hover {
        background-color: var(--color-fondo);
      }

      ::slotted(span[slot="accion"]) {
        color: var(--color-texto);
        font-weight: bold;
        font-size: 1rem;
      }
  </style>

  <section class="banner-prom">
    <div id="banner-prom__img">
      <slot name="imagen">
        <img src="./img/coffee-beans.png">
      </slot>
    </div>
    <div class="banner-prom__msg">
      <h2>
        <span style = "font-size: 60px;" id="banner-prom__discount"></span>
        <slot name="titulo">Título de la promocion</slot>
      </h2>
      <hr />
      <p>
        <slot>Texto descriptivo de la promoción</slot>
        <br>
        Usa el código: <span style = "font-size: 20px; font-weight: bold" id="banner-prom__code"></span>
      </p>
      <button>
        <slot name="accion">Texto del botón</slot>
      </button>
    </div>
  </section>
`;

class bannerPromocion extends HTMLElement {
  constructor() {
    super();
    // Shadow DOM para encapsular la estructura y los estilos del banner.
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["descuento", "codigo"];
  }

  connectedCallback() {
    // Cada instancia recibe una copia independiente de la plantilla y
    // sincroniza sus atributos iniciales con el contenido visible.
    this.shadowRoot.replaceChildren(plantilla.content.cloneNode(true));
    this._actualizarContenido(this.descuento, "banner-prom__discount", "", "% ");
    this._actualizarContenido(this.codigo, "banner-prom__code", "", "");
  }

  attributeChangedCallback(nombre, anterior, valor) {
    if (anterior === valor || !this.shadowRoot) return;

    // Mantiene actualizados el descuento y el código cuando cambia
    // cualquiera de los atributos observados del componente.
    switch (nombre) {
      case "codigo":
        this._actualizarContenido(valor, "banner-prom__code", "", "");
        break;
      case "descuento":
        this._actualizarContenido(valor, "banner-prom__discount", "", "% ");
        break;
    }
  }

  // Actualiza un elemento del Shadow DOM con el valor recibido y los textos
  // opcionales que lo acompañan, como el símbolo de porcentaje del descuento.
  _actualizarContenido(valor, elementId, textoIzquierda, textoDerecha) {
    const display = this.shadowRoot?.getElementById(`${elementId}`);
    if (!display) return;
    display.textContent = `${textoIzquierda}${valor}${textoDerecha}`;
  }

  // La propiedad lee y escribe el atributo, así quedan sincronizados.
  get codigo() {
    return this.getAttribute("codigo") ?? "";
  }

  set codigo(valor) {
    this.setAttribute("codigo", valor);
  }

  get descuento() {
    return this.getAttribute("descuento") || "";
  }

  set descuento(valor) {
    this.setAttribute("descuento", valor);
  }
}

// Registra <banner-promocion> para poder usarlo directamente en HTML.
customElements.define("banner-promocion", bannerPromocion);
