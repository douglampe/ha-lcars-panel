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
import RecursiveComponent from './components/RecursiveComponent.vue'
import StateColor from './components/StateColor.vue'
import StateTable from './components/StateTable.vue'
import AttributeTable from './components/AttributeTable.vue'
import AttributeFlow from './components/AttributeFlow.vue'
import AttributeList from './components/AttributeList.vue'
import StateValue from './components/StateValue.vue'
import ScaleHorizontal from './components/ScaleHorizontal.vue'
import LCARSMarkdown from './components/LCARSMarkdown.vue'
import LCARSSample from './components/LCARSSample.vue'
import LCARSThemeSample from './components/LCARSThemeSample.vue'
import StateValueTable from './components/StateValueTable.vue'
import MenuVertical from './components/MenuVertical.vue'
import MenuHorizontal from './components/MenuHorizontal.vue'
import NavRemote from './components/NavRemote.vue'
import LCARSModal from './components/LCARSModal.vue'
import LCARSApi from './components/LCARSApi.vue'
import RemoteConfig from './components/RemoteConfig.vue'
import AbsoluteContainer from './components/AbsoluteContainer.vue'

export const components = {} as Record<string, any>

registerComponent('default', RecursiveComponent)
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
registerComponent('theme-sample', LCARSThemeSample)
registerComponent('state-color', StateColor)
registerComponent('state-value', StateValue)
registerComponent('state-value-table', StateValueTable)
registerComponent('state-table', StateTable)
registerComponent('attribute-table', AttributeTable)
registerComponent('attribute-flow', AttributeFlow)
registerComponent('attribute-list', AttributeList)
registerComponent('scale-h', ScaleHorizontal)
registerComponent('remote', RemoteConfig)
registerComponent('absolute-container', AbsoluteContainer)
registerComponent('menu-vertical', MenuVertical)
registerComponent('menu-horizontal', MenuHorizontal)
registerComponent('nav-remote', NavRemote)
registerComponent('lcars-modal', LCARSModal)
registerComponent('api-docs', LCARSApi)

export function registerComponent(key: string, component: any) {
  components[key] = component
}
