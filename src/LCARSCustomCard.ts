import { haState } from './HAState'
import { haConfig, loadConfig } from './HAConfig'
import './editor.ts'

export class LCARSCustomCard extends HTMLElement {
  private vueElement: any
  private test: boolean = false

  static get observedAttributes() {
    return ['config', 'test']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.vueElement = null
  }

  // TODO: Turn on once editor is ready
  // static getConfigElement() {
  //   return document.createElement('ha-lcars-panel-editor')
  // }

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
    loadConfig(config)

    if (this.vueElement) {
      this.vueElement.config = config
    }
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (name === 'test') {
      this.loadTest = true
    }
    if (name === 'config') {
      this.setConfig(newValue)
    }
  }

  connectedCallback() {
    if (!this.vueElement) {
      this.vueElement = document.createElement('lcars-card')
      this.vueElement.config = haConfig.value ?? { children: [] }
      this.vueElement.loadTest = this.test
      this.shadowRoot?.appendChild(this.vueElement)

      const head = document.head
      const link = document.createElement('link')

      link.type = 'text/css'
      link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css2?family=Antonio:wght@400;700&display=swap'

      head.appendChild(link)

      // watch(haConfig, (newConfig) => {
      //   this.setConfig(newConfig)
      //   const event = new Event('config-changed', {
      //     bubbles: true,
      //     composed: true,
      //   }) as any
      //   event.detail = { config: newConfig }
      //   this.dispatchEvent(event)
      // })
    }
  }

  disconnectedCallback() {
    if (this.vueElement) {
      this.shadowRoot?.removeChild(this.vueElement)
      this.vueElement = null
    }
  }
}
