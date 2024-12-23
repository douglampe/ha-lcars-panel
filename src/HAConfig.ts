import LCARSRow from './components/LCARSRow.vue'
import LCARSCol from './components/LCARSCol.vue'
import PanelBL from './components/PanelBL.vue'
import LCARSElement from './components/LCARSElement.vue'
import PanelTL from './components/PanelTL.vue'
import PanelTR from './components/PanelTR.vue'
import PanelBR from './components/PanelBR.vue'
import PanelAll from './components/PanelAll.vue'
import LCARSPill from './components/LCARSPill.vue'
import LCARSTable from './components/LCARSTable.vue'
import StateColor from './components/StateColor.vue'
import AttributeTable from './components/AttributeTable.vue'
import AttributeFlow from './components/AttributeFlow.vue'
import AttributeList from './components/AttributeList.vue'
import StateValue from './components/StateValue.vue'
import ScaleHorizontal from './components/ScaleHorizontal.vue'
import LCARSMarkdown from './components/LCARSMarkdown.vue'
import type { ConfigItem } from './ConfigItem'
import { ref } from 'vue'
import LCARSSample from './components/LCARSSample.vue'

export interface HAConfig {
  type: string
  vars: Record<string, string>
  children: ConfigItem[]
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const components = {} as Record<string, any>

registerComponent('el', LCARSElement)
registerComponent('pill', LCARSPill)
registerComponent('row', LCARSRow)
registerComponent('col', LCARSCol)
registerComponent('panel-bl', PanelBL)
registerComponent('panel-tl', PanelTL)
registerComponent('panel-tr', PanelTR)
registerComponent('panel-br', PanelBR)
registerComponent('panel-all', PanelAll)
registerComponent('table', LCARSTable)
registerComponent('md', LCARSMarkdown)
registerComponent('sample', LCARSSample)
registerComponent('state-color', StateColor)
registerComponent('state-value', StateValue)
registerComponent('attribute-table', AttributeTable)
registerComponent('attribute-flow', AttributeFlow)
registerComponent('attribute-list', AttributeList)
registerComponent('scale-h', ScaleHorizontal)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerComponent(key: string, component: any) {
  components[key] = component
}

export function setVariable(key: string, value: string) {
  const formattedKey = `--${key.replace(/_/g, '-')}`
  document.documentElement?.style.setProperty(formattedKey, value)
}

export function loadVariables(haConfig: HAConfig) {
  if (haConfig?.vars) {
    Object.entries(haConfig.vars).forEach(([key, value]) => {
      setVariable(key, value as string)
    })
  }
}
