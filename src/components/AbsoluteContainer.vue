<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import type { ConfigItem } from '@/ConfigItem'
import { unitSize } from '@/Layout'
import { computed, useAttrs } from 'vue'
import ParentComponent from './ParentComponent.vue'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as any

const { children = [] } = defineProps<{ children?: ConfigItem[] }>()

const filteredAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { tag, type, showForNav, stateMap, children, mixin, ...rest } = attrs
  return rest
})

const styleObject = computed(() => {
  const { width, height, ...rest } = filteredAttrs.value
  return {
    position: 'absolute',
    width: unitSize(width),
    height: unitSize(height),
    ...rest.style,
  }
})
</script>

<template>
  <div :style="styleObject" v-bind="filteredAttrs">
    <ParentComponent :children="children" childPositioning="absolute"
      ><slot></slot
    ></ParentComponent>
  </div>
</template>
