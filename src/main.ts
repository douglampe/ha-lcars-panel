import { defineCustomElement } from 'vue'
import LCARSCardCe from './LCARSCard.ce.vue'
import { LCARSCustomCard } from './LCARSCustomCard.ts'
import { registerAllComponents } from './ComponentRegistry.ts'
import './editor.ts'

customElements.define('lcars-card', defineCustomElement(LCARSCardCe))
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

registerAllComponents()
