import AbsoluteContainer from './components/AbsoluteContainer.vue'
import AttributeFlow from './components/AttributeFlow.vue'
import AttributeList from './components/AttributeList.vue'
import AttributeTable from './components/AttributeTable.vue'
import HACard from './components/HACard.vue'
import LCARSApi from './components/LCARSApi.vue'
import LCARSCol from './components/LCARSCol.vue'
import LCARSElement from './components/LCARSElement.vue'
import LCARSMarkdown from './components/LCARSMarkdown.vue'
import LCARSModal from './components/LCARSModal.vue'
import LCARSPill from './components/LCARSPill.vue'
import LCARSRow from './components/LCARSRow.vue'
import LCARSSample from './components/LCARSSample.vue'
import LCARSTable from './components/LCARSTable.vue'
import LCARSThemeSample from './components/LCARSThemeSample.vue'
import MenuHorizontal from './components/MenuHorizontal.vue'
import MenuVertical from './components/MenuVertical.vue'
import NavRemote from './components/NavRemote.vue'
import PanelAll from './components/PanelAll.vue'
import PanelBL from './components/PanelBL.vue'
import PanelBottom from './components/PanelBottom.vue'
import PanelBR from './components/PanelBR.vue'
import PanelLeft from './components/PanelLeft.vue'
import PanelRight from './components/PanelRight.vue'
import PanelTL from './components/PanelTL.vue'
import PanelTop from './components/PanelTop.vue'
import PanelTR from './components/PanelTR.vue'
import RecursiveComponent from './components/RecursiveComponent.vue'
import RemoteConfig from './components/RemoteConfig.vue'
import StateColor from './components/StateColor.vue'
import StateTable from './components/StateTable.vue'
import StateValue from './components/StateValue.vue'
import ScaleHorizontal from './components/ScaleHorizontal.vue'
import StateValueTable from './components/StateValueTable.vue'
import TextComponent from './components/TextComponent.vue'

export const components = {} as Record<string, any>

export function registerAllComponents() {
  registerComponent('default', RecursiveComponent)
  registerComponent('absolute-container', AbsoluteContainer)
  registerComponent('api-docs', LCARSApi)
  registerComponent('attribute-table', AttributeTable)
  registerComponent('attribute-flow', AttributeFlow)
  registerComponent('attribute-list', AttributeList)
  registerComponent('col', LCARSCol)
  registerComponent('el', LCARSElement)
  registerComponent('ha-card', HACard)
  registerComponent('modal', LCARSModal)
  registerComponent('md', LCARSMarkdown)
  registerComponent('menu-horizontal', MenuHorizontal)
  registerComponent('menu-vertical', MenuVertical)
  registerComponent('nav-remote', NavRemote)
  registerComponent('panel-all', PanelAll)
  registerComponent('panel-bl', PanelBL)
  registerComponent('panel-b', PanelBottom)
  registerComponent('panel-br', PanelBR)
  registerComponent('panel-l', PanelLeft)
  registerComponent('panel-r', PanelRight)
  registerComponent('panel-tl', PanelTL)
  registerComponent('panel-t', PanelTop)
  registerComponent('panel-tr', PanelTR)
  registerComponent('pill', LCARSPill)
  registerComponent('remote', RemoteConfig)
  registerComponent('row', LCARSRow)
  registerComponent('sample', LCARSSample)
  registerComponent('scale-h', ScaleHorizontal)
  registerComponent('state-color', StateColor)
  registerComponent('state-value', StateValue)
  registerComponent('state-value-table', StateValueTable)
  registerComponent('state-table', StateTable)
  registerComponent('table', LCARSTable)
  registerComponent('text', TextComponent)
  registerComponent('theme-sample', LCARSThemeSample)
}

function registerComponent(key: string, component: any) {
  components[key] = component
}
