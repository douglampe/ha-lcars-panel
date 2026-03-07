<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as any

const filteredAttrs = computed(() => {
  const { tag, type, showForNav, stateMap, children, mixin, ...rest } = attrs
  return rest
})
</script>

<template>
  <component :is="attrs.tag ?? 'div'" v-bind="filteredAttrs"><slot></slot></component>
</template>
