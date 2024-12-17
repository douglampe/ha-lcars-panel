<script setup lang="ts">
import CPanel from './CPanel.vue'
import DPanel from './DPanel.vue'
import EntityAttributeTable from './EntityAttributeTable.vue'
import HAStateTable from './HAStateTable.vue'
import HAStateValue from './HAStateValue.vue'
import HAStateView from './HAStateView.vue'
import HorizontalPanel from './HorizontalPanel.vue'
import HorizontalScale from './HorizontalScale.vue'
import LCARSColumn from './LCARSColumn.vue'
import LCARSRow from './LCARSRow.vue'
import OPanel from './OPanel.vue'
import PPanel from './PPanel.vue'
import SevenPanel from './SevenPanel.vue'
import VerticalPanel from './VerticalPanel.vue'
import VerticalScale from './VerticalScale.vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  VerticalPanel,
  VerticalScale,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { items } = defineProps<{ items: any }>()
</script>

<template>
  <component
    v-for="(item, index) in items"
    :is="item.type ? components[item.type] : 'div'"
    :key="index"
    v-bind="item.props"
  >
    <template #left v-if="item.leftChildren">
      <RecursiveComponent :items="item.leftChildren" />
    </template>
    <template #top v-if="item.topChildren">
      <RecursiveComponent :items="item.topChildren" />
    </template>
    <template #bottom v-if="item.bottomChildren">
      <RecursiveComponent :items="item.bottomChildren" />
    </template>
    <template #right v-if="item.rightChildren">
      <RecursiveComponent :items="item.rightChildren" />
    </template>
    <RecursiveComponent :items="item.children" />
  </component>
</template>
