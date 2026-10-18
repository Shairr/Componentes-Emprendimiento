const template = document.createElement("template");
template.innerHTML = `
  <div class="ficha-tarjeta">
    <!-- SVG decorativo de fondo -->
    <svg class="marca-agua" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 8c.7-1 1-2.2 1-3.5A5.5 5.5 0 0 0 12.5 0 5.5 5.5 0 0 0 7 4.5c0 1.3.3 2.5 1 3.5"></path>
      <path d="M6 12c-2 0-3 1.5-3 3s1 3 3 3h12c2 0 3-1.5 3-3s-1-3-3-3"></path>
      <path d="M12 8v16"></path>
    </svg>


    <div class="encabezado">
      <slot name="region">
        <h3 class="region-fallback">Origen: Sin especificar</h3>
      </slot>
    </div>


    <div class="especificaciones">
      <div class="fila-dato">
        <div class="celda-clave">
          <svg class="icono-dato" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="14 9 20 20 4 20 9 12 11.5 15"></polygon><path d="M9 12l2-3 2 3"></path></svg>
          Altitud:
        </div>
        <div class="celda-valor" id="altitud-display">—</div>
      </div>
      <div class="fila-dato">
        <div class="celda-clave">
          <svg class="icono-dato" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path><path d="M12 2c0 6.5-4 11-4 11"></path><path d="M12 22c0-6.5 4-11 4-11"></path></svg>
          Tueste:
        </div>
        <div class="celda-valor" id="tueste-display">—</div>
      </div>
      <div class="fila-dato sin-borde-inferior">
        <div class="celda-clave">
          <svg class="icono-dato" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
          Intensidad:
        </div>
        <div class="celda-valor" id="intensidad-display">—</div>
      </div>
    </div>


    <div class="notas-adicionales">
      <slot>Café de especialidad 100% ecuatoriano.</slot>
    </div>
  </div>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@400;500;600;700&display=swap');

    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--color-superficie, #ffffff);
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(111, 78, 55, 0.06);
      font-family: 'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif;
      color: var(--color-texto, #2c1a0e);
      border: 1px solid rgba(111, 78, 55, 0.08);
      border-top: 5px solid var(--color-marca, #6f4e37);
      transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease;
      overflow: hidden; 
      position: relative;
    }

    :host(:hover) {
      transform: translateY(-6px);
      box-shadow: 0 16px 32px rgba(111, 78, 55, 0.1);
    }

    .ficha-tarjeta {
      padding: 2rem 2.2rem;
      display: flex;
      flex-direction: column;
      height: 100%;
      flex: 1;
      box-sizing: border-box;
      position: relative;
      z-index: 1;
    }

    .marca-agua {
      position: absolute;
      bottom: -15%;
      right: -10%;
      width: 200px;
      height: 200px;
      color: var(--color-marca, #6f4e37);
      opacity: 0.04;
      z-index: -1;
      transform: rotate(-15deg);
    }

    .encabezado {
      margin-bottom: 1.4rem;
      padding-bottom: 0.8rem;
    }

    ::slotted([slot="region"]),
    .region-fallback {
      margin: 0;
      font-family: var(--fuente-display, 'Cormorant Garamond', Georgia, serif);
      font-size: 1.65rem;
      font-weight: 700;
      color: var(--color-marca, #6f4e37);
      line-height: 1.2;
    }

    .especificaciones {
      display: flex;
      flex-direction: column;
      background: rgba(111, 78, 55, 0.03); 
      border-radius: 12px;
      margin-bottom: 1.6rem;
      padding: 0.5rem 0;
    }

    .fila-dato {
      display: flex;
      align-items: stretch;
      padding: 0.5rem 1.2rem;
    }

    .celda-clave {
      font-weight: 600;
      color: var(--color-texto, #1a1a1a);
      min-width: 110px;
      display: flex;
      align-items: center;
      font-size: 0.92rem;
    }

    .celda-clave svg {
      margin-right: 0.45rem;
      flex-shrink: 0;
      color: var(--color-marca, #6f4e37);
      opacity: 0.7;
    }

    .celda-valor {
      font-weight: 500;
      color: var(--color-marca, #6f4e37);
      flex: 1;
      font-size: 0.92rem;
      margin-left: 0.5rem;
      display: flex;
      align-items: center;
      white-space: normal; 
      word-break: break-word;
    }

    .icono-dato {
      width: 16px;
      height: 16px;
    }

    .notas-adicionales {
      font-size: 0.94rem;
      color: #7a706b;
      line-height: 1.6;
      margin-bottom: 0;
    }

    ::slotted(p) {
      margin: 0;
      font-style: italic;
    }
  </style>
`;

export class FichaOrigen extends HTMLElement {
  static get observedAttributes() {
    return ["altitud", "tueste", "intensidad"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    if (this.hasAttribute("altitud")) this._actualizarAltitud(this.getAttribute("altitud"));
    if (this.hasAttribute("tueste")) this._actualizarTueste(this.getAttribute("tueste"));
    if (this.hasAttribute("intensidad")) this._actualizarIntensidad(this.getAttribute("intensidad"));
  }

  attributeChangedCallback(nombre, _valorAnterior, valorNuevo) {
    if (nombre === "altitud") this._actualizarAltitud(valorNuevo);
    else if (nombre === "tueste") this._actualizarTueste(valorNuevo);
    else if (nombre === "intensidad") this._actualizarIntensidad(valorNuevo);
  }

  _actualizarAltitud(valor) {
    const display = this.shadowRoot?.getElementById("altitud-display");
    if (!display) return;
    display.textContent = (!valor || valor.trim() === "") ? "—" : (valor.includes("msnm") ? valor : `${valor} msnm`);
  }

  _actualizarTueste(valor) {
    const display = this.shadowRoot?.getElementById("tueste-display");
    if (display) display.textContent = (!valor || valor.trim() === "") ? "—" : valor;
  }

  _actualizarIntensidad(valor) {
    const display = this.shadowRoot?.getElementById("intensidad-display");
    if (display) display.textContent = (!valor || valor.trim() === "") ? "—" : valor;
  }

  // Getters y Setters
  get altitud() {
    return parseFloat(this.getAttribute("altitud")) || 0;
  }

  set altitud(valor) {
    this.setAttribute("altitud", valor);
  }

  get tueste() {
    return this.getAttribute("tueste") || "";
  }

  set tueste(valor) {
    this.setAttribute("tueste", valor);
  }

  get intensidad() {
    return this.getAttribute("intensidad") || "";
  }

  set intensidad(valor) {
    this.setAttribute("intensidad", valor);
  }
}

if (!customElements.get("ficha-origen")) {
  customElements.define("ficha-origen", FichaOrigen);
}