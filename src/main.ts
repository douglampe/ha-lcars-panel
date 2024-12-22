/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineCustomElement } from 'vue'

import { haState } from './HAState'
import { loadConfig } from './HAConfig'
import LCARSCardCe from './LCARSCard.ce.vue'

customElements.define('lcars-card', defineCustomElement(LCARSCardCe))

class LCARSCustomCard extends HTMLElement {
  private vueElement: any
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.vueElement = null
  }

  set config(config: any) {
    this.setConfig(config)
  }

  set panel(panel: any) {
    if (panel.config) {
      loadConfig(panel.config)
    }
  }

  set hass(hass: any) {
    haState.value = hass
  }

  setConfig(config: any) {
    if (!config) {
      return
    }

    loadConfig(config)
  }

  connectedCallback() {
    if (!this.vueElement) {
      this.vueElement = document.createElement('lcars-card')
      this.shadowRoot?.appendChild(this.vueElement)
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

if (!(window as any).customCards.some((card: any) => card.type === 'ha-lcars-panel')) {
  ;(window as any).customCards.push({
    type: 'ha-lcars-panel',
    name: 'LCARS Custom Card',
    preview: true,
    description: 'LCARS Custom Dashboard',
  })
}

if (!customElements.get('ha-lcars-panel')) {
  customElements.define('ha-lcars-panel', LCARSCustomCard)
}
