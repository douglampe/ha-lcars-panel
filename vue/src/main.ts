/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineCustomElement } from 'vue'
import LCARSCardCe from './LCARSCard.ce.vue'

customElements.define('lcars-card', defineCustomElement(LCARSCardCe))

class LCARSCustomCard extends HTMLElement {
  private vueElement: any
  private config: any
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.vueElement = null
  }

  set hass(hass: any) {
    if (this.vueElement) {
      this.vueElement.hass = hass
    }
  }

  setConfig(config: any) {
    if (!config) {
      return
    }

    this.config = config
    if (this.vueElement) {
      this.vueElement.config = this.config
    }
  }

  connectedCallback() {
    if (!this.vueElement) {
      this.vueElement = document.createElement('lcars-card')
      this.shadowRoot?.appendChild(this.vueElement)
      this.vueElement.config = this.config
    }
  }

  disconnectedCallback() {
    if (this.vueElement) {
      this.shadowRoot?.removeChild(this.vueElement)
      this.vueElement = null
    }
  }
}

;(window as any).customCards = (window as any).customCards || []

if (!(window as any).customCards.some((card: any) => card.type === 'lcars-custom-card')) {
  ;(window as any).customCards.push({
    type: 'lcars-custom-card',
    name: 'LCARS Custom Card',
    preview: true,
    description: 'LCARS Custom Dashboard',
  })
}

if (!customElements.get('lcars-custom-card')) {
  customElements.define('lcars-custom-card', LCARSCustomCard)
}
