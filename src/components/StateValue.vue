<script setup lang="ts">
import { computed } from 'vue'

import { haState } from '../HAState'

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
  if (!haState.value?.states) {
    return undefined
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entityObject: any = haState.value.states[entity]

  if (!entityObject?.attributes) {
    return undefined
  }

  return entityObject.attributes[attribute]
})
</script>
<template>{{ value }}</template>
