//Definción de la plantilla del componente

const plantilla = document.createElement("template");
plantilla.innerHTML = `
<!-- Definición de los estilos -->
<style>
  :host {
    display: block;
    max-width: 380px;
    flex: 1 1 320px;
    font-family: var(--fuente-base, system-ui, sans-serif);
  }

  .tarjeta-testimonio {
    background-color: var(--color-superficie, #ffffff);
    border: 1px solid rgba(111, 78, 55, 0.12);
    border-radius: 16px;
    padding: 24px;
    box-shadow: var(--sombra-suave, 0 4px 16px -2px rgba(44, 26, 14, 0.05));
    transition: var(--transicion-suave, all 0.3s ease);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .tarjeta-testimonio:hover {
    transform: translateY(-4px);
    box-shadow: var(--sombra-elegante, 0 10px 30px -8px rgba(44, 26, 14, 0.12));
    border-color: var(--color-acento, #c68642);
  }

  /* Encabezado: foto + autor/calificación */
  .cabecera {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .avatar-contenedor {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    border: 2px solid var(--color-acento, #c68642);
    background-color: var(--color-fondo, #faf7f4);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Estilizado de la imagen que entra por slot */
  ::slotted(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .info-autor {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  /* Estilo del nombre del cliente */
  .nombre {
    font-weight: 700;
    font-size: 1.05rem;
    color: var(--color-texto, #2c1a0e);
  }

  ::slotted([slot="autor"]) {
    font-weight: 700;
    color: var(--color-texto, #2c1a0e);
    text-decoration: none;
  }

  /* Estrellas o calificación */
  .calificacion {
    color: var(--color-acento, #c68642);
    font-size: 0.95rem;
    letter-spacing: 2px;
  }

  /* Reseña / Review */
  .cuerpo-review {
    position: relative;
    color: var(--color-texto-suave, #6a6460);
    font-size: 0.95rem;
    line-height: 1.6;
    font-style: italic;
  }

  ::slotted([slot="review"]),
  ::slotted(p) {
    margin: 0;
    color: inherit;
  }

  /* Comilla decorativa de apertura */
  .cuerpo-review::before {
    content: "“";
    font-family: var(--fuente-display, serif);
    font-size: 2.8rem;
    line-height: 0;
    position: absolute;
    top: 6px;
    left: -14px;
    color: var(--color-acento, #c68642);
    opacity: 0.35;
  }
</style>

<!-- Definición del componente -->
<div class="tarjeta-testimonio">
  <div class="cabecera">
    <div class="avatar-contenedor">
      <slot name="img">
        <img src="https://via.placeholder.com/60" alt="Cliente">
      </slot>
    </div>
    <div class="info-autor">
      <div class="nombre">
        <slot name="autor">Cliente Anónimo</slot>
      </div>
      <div class="calificacion" id="calificacion-contenedor"></div>
    </div>
  </div>

  <div class="cuerpo-review">
    <slot name="review">
      <p>Un servicio y producto de excelente calidad.</p>
    </slot>
  </div>
</div>
`;

//Denifinición de la clase para mi componente

export class TestimonioCliente extends HTMLElement {

  //Elementos observados del componente 

  //Definimos al atributo "calificacion" del componente
  //creado en el index.html para que sea monitoreado mediante
  // <testimonio-cliente calificacion = "5">...</testimonio-cliente>
  static get observedAttributes() {
    return ["calificacion"];
  }

  //Llamada al métododo constructor de la clase padre 

  constructor() {

    super();
    this.attachShadow({ mode: "open" });

  }

  //Métodos para acceder al atributo "calificacion"

  get calificacion() {

    return this.getAttribute("calificacion") || "5";

  }

  set calificacion(valor) {

    this.setAttribute("calificacion", valor);

  }

  attributeChangedCallback(nombre, anterior, nuevo) {

    if (nombre == "calificacion" && anterior != nuevo) {

      this.actualizarCalificacion();

    }


  }

  //Método para actualizar la calificación de estrellas.
  actualizarCalificacion() {

    const estrellasContenedor = (this.shadowRoot.querySelector("#calificacion-contenedor"));

    if (!estrellasContenedor) {

      return;

    }

    const valor = parseInt(this.calificacion, 10);

    if (valor >= 1 && valor <= 5) {

      const estrellas = "★".repeat(valor) + "☆".repeat(5 - valor);

      estrellasContenedor.textContent = estrellas;

    }

  }


  //Método con todos los objetos que se van a renderizar en el DOM.
  render() {

    this.shadowRoot.appendChild(plantilla.content.cloneNode(true));
    this.actualizarCalificacion();

  }

  connectedCallback() {
    this.render();
  }

}

//Registrar el componente
customElements.define("testimonio-cliente", TestimonioCliente);




