import { applyState, haState, loadTestState } from './HAState'
import { haCards, loadConfig, type HAConfig } from './HAConfig'
import { ref, watch } from 'vue'
import './editor.ts'
import { currentNav } from './LocalNav.ts'
import testConfig from '@/assets/config/welcome.yaml?raw'
import YAML from 'yaml'

export class LCARSCustomLayout extends HTMLElement {
  private vueElement: any
  private test: boolean = false
  private originalConfig: HAConfig | undefined = undefined
  private haConfig = ref<HAConfig>()

  static get observedAttributes() {
    return ['config', 'test']
  }

  static get properties() {
    return {
      cards: { type: Array, attribute: false },
    }
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.vueElement = null

    watch(
      () => currentNav.value,
      () => {
        this.onStateUpdated()
      },
      { deep: true },
    )
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
    this.onStateUpdated()
  }

  onStateUpdated() {
    if (this.originalConfig && this.haConfig.value) {
      const config = loadConfig(this.originalConfig)
      applyState(config)
      if (this.haConfig.value) {
        Object.assign(this.haConfig.value, config)
      }
    }
  }

  set cards(cards: Array<any>) {
    haCards.value = cards
  }

  setConfig(config: any) {
    this.originalConfig = config
    if (!this.haConfig.value) {
      this.haConfig.value = config
    }
    this.onStateUpdated()

    if (this.vueElement) {
      this.vueElement.config = this.haConfig
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
      if (this.test) {
        const testConfigParsed = YAML.parse(testConfig)
        loadTestState()
        this.setConfig(testConfigParsed)
        this.vueElement.loadTest = true
      }
      this.vueElement.config = this.haConfig.value ?? { children: [] }
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
