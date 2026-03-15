<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import type { ConfigItem } from '@/ConfigItem'
import { unitSize } from '@/Layout'
import { computed, useAttrs } from 'vue'
import ParentComponent from './ParentComponent.vue'
import LCARSElement from './LCARSElement.vue'

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
</script>

<template>
  <LCARSElement positioning="relative" style="display: inline-block" v-bind="filteredAttrs">
    <ParentComponent :children="children" childPositioning="absolute"> ></ParentComponent>
  </LCARSElement>
</template>
