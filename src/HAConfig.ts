import { ref } from 'vue'
import { loadTestConfig } from './demo/TestConfig'
import LCARSRow from './components/LCARSRow.vue'
import LCARSCol from './components/LCARSCol.vue'
import PanelBL from './components/PanelBL.vue'
import LCARSElement from './components/LCARSElement.vue'
import PanelTL from './components/PanelTL.vue'
import PanelAll from './components/PanelAll.vue'
import LCARSPill from './components/LCARSPill.vue'
import LCARSTable from './components/LCARSTable.vue'
import StateColor from './components/StateColor.vue'
import AttributeTable from './components/AttributeTable.vue'
import AttributeFlow from './components/AttributeFlow.vue'
import AttributeList from './components/AttributeList.vue'
import { loadTestState } from './HAState'
import StateValue from './components/StateValue.vue'
import ScaleHorizontal from './components/ScaleHorizontal.vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const haConfig = ref({} as any)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const components = {} as Record<string, any>

registerComponent('el', LCARSElement)
registerComponent('pill', LCARSPill)
registerComponent('row', LCARSRow)
registerComponent('col', LCARSCol)
registerComponent('panel-bl', PanelBL)
registerComponent('panel-tl', PanelTL)
registerComponent('panel-all', PanelAll)
registerComponent('table', LCARSTable)
registerComponent('state-color', StateColor)
registerComponent('state-value', StateValue)
registerComponent('attribute-table', AttributeTable)
registerComponent('attribute-flow', AttributeFlow)
registerComponent('attribute-list', AttributeList)
registerComponent('scale-h', ScaleHorizontal)

export function registerComponent(key: string, component: any) {
  components[key] = component
}

if (import.meta.env.DEV) {
  loadTestConfig()
  loadTestState()
}

export function setVariable(key: string, value: string) {
  const formattedKey = `--${key.replace('_', '-')}`
  document.documentElement?.style.setProperty(formattedKey, value)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function loadConfig(config: any) {
  haConfig.value = config

  loadVariables()
}

export function loadVariables() {
  if (haConfig.value?.vars) {
    Object.entries(haConfig.value?.vars).forEach(([key, value]) => {
      setVariable(key, value as string)
    })
  }
}
