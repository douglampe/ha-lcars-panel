<script setup lang="ts">
import { computed } from 'vue'

import { getStateValue, haState } from '../HAState'

const { entity, attribute } = defineProps({
  entity: {
    type: String,
    default() {
      return 'Sensor'
    },
  },
  attribute: {
    type: String,
    default() {
      return 'Sensor'
    },
  },
})

const value = computed(() => {
  return getStateValue(haState.value, entity, attribute)
})
</script>
<template>{{ value }}</template>
