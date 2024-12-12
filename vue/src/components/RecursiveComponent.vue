<script setup lang="ts">
import HorizontalPanel from './HorizontalPanel.vue'
import HorizontalScale from './HorizontalScale.vue'
import LCARSColumn from './LCARSColumn.vue'
import LCARSRow from './LCARSRow.vue'
import VerticalPanel from './VerticalPanel.vue'
import VerticalScale from './VerticalScale.vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: Record<string, any> = {
  HorizontalPanel,
  HorizontalScale,
  LCARSColumn,
  LCARSRow,
  VerticalPanel,
  VerticalScale,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { hass, items } = defineProps<{ hass: any; items: any }>()
</script>

<template>
  <component
    v-for="(item, index) in items"
    :is="components[item.type]"
    :key="index"
    :hass="hass"
    v-bind="item.props"
  >
    <RecursiveComponent :hass="hass" :items="item.children" />
  </component>
</template>
