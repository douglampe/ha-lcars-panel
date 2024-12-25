<script setup lang="ts">
import { computed } from 'vue'

import { getStateValue, haState } from '../HAState'

const { entity, attribute } = defineProps<{ entity: string; attribute?: string }>()

const value = computed(() => {
  return getStateValue(haState.value, entity, attribute)
})
</script>
<template>{{ value }}</template>
