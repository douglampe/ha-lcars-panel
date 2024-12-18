<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { currentNav, navigate } from '../LocalNav'
import CPanel from './CPanel.vue'
import DemoContainer from './demo/DemoContainer.vue'
import ElementDemo from './demo/ElementDemo.vue'
import LayoutsDemo from './demo/LayoutsDemo.vue'
import PanelDemo from './demo/PanelDemo.vue'
import ReplicaDemo from './demo/ReplicaDemo.vue'
import TextDemo from './demo/TextDemo.vue'
import DPanel from './DPanel.vue'
import EntityAttributeTable from './EntityAttributeTable.vue'
import HAStateTable from './HAStateTable.vue'
import HAStateValue from './HAStateValue.vue'
import HAStateView from './HAStateView.vue'
import HorizontalPanel from './HorizontalPanel.vue'
import HorizontalScale from './HorizontalScale.vue'
import LCARSColumn from './LCARSColumn.vue'
import LCARSMenuPanel from './LCARSMenuPanel.vue'
import LCARSRow from './LCARSRow.vue'
import NumberedMenuItem from './NumberedMenuItem.vue'
import OPanel from './OPanel.vue'
import PPanel from './PPanel.vue'
import SevenPanel from './SevenPanel.vue'
import VerticalPanel from './VerticalPanel.vue'
import VerticalScale from './VerticalScale.vue'

const components: Record<string, any> = {
  CPanel,
  DPanel,
  PPanel,
  SevenPanel,
  OPanel,
  EntityAttributeTable,
  HAStateTable,
  HAStateValue,
  HAStateView,
  HorizontalPanel,
  HorizontalScale,
  LCARSColumn,
  LCARSRow,
  LCARSMenuPanel,
  NumberedMenuItem,
  VerticalPanel,
  VerticalScale,
  DemoContainer,
  ElementDemo,
  LayoutsDemo,
  PanelDemo,
  ReplicaDemo,
  TextDemo,
}

interface Props {
  type?: string
  text?: string
  props?: Record<string, any>
  showForNav?: string
  nav?: string
  href?: string
  children?: any[]
  leftChildren?: any[]
  rightChildren?: any[]
  topChildren?: any[]
  bottomChildren?: any[]
}

const config = defineProps<Props>()

function isVisible() {
  if (config.showForNav && !currentNav?.value.startsWith(config.showForNav)) {
    return false
  }
  return true
}

function onClick() {
  if (config.nav) {
    navigate(config.nav)
  }
}
</script>

<template>
  <component
    v-if="isVisible()"
    :is="config.type ? components[config.type] : 'div'"
    v-bind="config.props"
    @click="onClick()"
  >
    <template #left v-if="config.leftChildren">
      <RecursiveComponent
        v-for="(child, index) in config.leftChildren"
        :key="index"
        v-bind="child"
      />
    </template>
    <template #top v-if="config.topChildren">
      <RecursiveComponent
        v-for="(child, index) in config.leftChildren"
        :key="index"
        v-bind="child"
      />
    </template>
    <template #bottom v-if="config.bottomChildren">
      <RecursiveComponent
        v-for="(child, index) in config.leftChildren"
        :key="index"
        v-bind="child"
      />
    </template>
    <template #right v-if="config.rightChildren">
      <RecursiveComponent
        v-for="(child, index) in config.rightChildren"
        :key="index"
        v-bind="child"
      />
    </template>
    {{ text }}
    <RecursiveComponent v-for="(child, index) in config.children" :key="index" v-bind="child" />
  </component>
</template>
