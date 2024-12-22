/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineCustomElement } from 'vue'

import { haState, loadTestState } from './HAState'
import LCARSCardCe from './LCARSCard.ce.vue'
import type { HAConfig } from './HAConfig'

customElements.define('lcars-card', defineCustomElement(LCARSCardCe))

class LCARSCustomCard extends HTMLElement {
  private vueElement: any
  private haConfig?: HAConfig
  private test: boolean = false

  static get observedAttributes() {
    return ['config', 'test']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.vueElement = null
  }

  set loadTest(test: any) {
    this.setLoadTest(test)
  }

  setLoadTest(test: any) {
    this.test = test
    if (this.vueElement) {
      this.vueElement.loadTest = test
    }
  }

  set config(config: any) {
    this.setConfig(config)
  }

  set panel(panel: any) {
    if (panel.config) {
      this.setConfig(panel.config)
    }
  }

  set hass(hass: any) {
    haState.value = hass
  }

  setConfig(config: any) {
    if (!config) {
      return
    }

    this.haConfig = config
    if (this.vueElement) {
      this.vueElement.config = config
    }
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (name === 'test') {
      this.loadTest = true
    }
  }

  connectedCallback() {
    if (!this.vueElement) {
      this.vueElement = document.createElement('lcars-card')
      this.vueElement.config = this.haConfig ?? { children: [] }
      this.vueElement.loadTest = this.test
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
    name: 'LCARS Custom Panel',
    preview: true,
    description: 'LCARS Custom Panel',
  })
}

if (!customElements.get('ha-lcars-panel')) {
  customElements.define('ha-lcars-panel', LCARSCustomCard)
}
