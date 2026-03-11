/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineCustomElement, watch } from 'vue'

import { haState } from './HAState'
import LCARSCardEditorCe from './LCARSCardEditor.ce.vue'
import { haConfig, loadMixins, type HAConfig } from './HAConfig'

customElements.define('lcars-card-editor', defineCustomElement(LCARSCardEditorCe))

class LCARSCustomCardEditor extends HTMLElement {
  private vueElement: any
  private haConfig?: HAConfig
  private test: boolean = false

  setConfig(config: any) {
    if (!config) {
      return
    }

    this.haConfig = config
  }

  configChanged(newConfig: any) {
    const event = new Event('config-changed', {
      bubbles: true,
      composed: true,
    }) as any
    event.detail = { config: newConfig }
    this.dispatchEvent(event)
  }
}

if (!customElements.get('ha-lcars-panel-editor')) {
  customElements.define('ha-lcars-panel-editor', LCARSCustomCardEditor)
}
