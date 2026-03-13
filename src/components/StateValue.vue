<script setup lang="ts">
import { computed } from 'vue'

import { getStateValue, haState } from '../HAState'

const { entity, attribute } = defineProps<{ entity?: string; attribute?: string }>()

defineOptions({
  inheritAttrs: false,
})

const value = computed(() => {
  if (entity) {
    return getStateValue(haState.value, entity, attribute)
  }
  return ''
})
</script>
<template>{{ value }}</template>
