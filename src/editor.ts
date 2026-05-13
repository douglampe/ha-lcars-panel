import { defineCustomElement } from 'vue'

import LCARSCardEditorCe from './LCARSCardEditor.ce.vue'
if (!customElements.get('lcars-card-editor')) {
  customElements.define('lcars-card-editor', defineCustomElement(LCARSCardEditorCe))
}

class LCARSCustomCardEditor extends HTMLElement {
  setConfig(config: any) {
    // TODO: Figure out if this is needed and implement
  }

  static getStubConfig() {
    return {
      type: 'ha-lcars-panel',
      vars: {},
      mixins: {},
      children: [
        {
          type: 'panel-tl',
          color: 'dodger-blue',
          children: [{ type: 'pill', color: 'dodgerblue', text: 'Hello LCARS World' }],
        },
      ],
    }
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
