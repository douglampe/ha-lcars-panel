<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import gsap from 'gsap'

import { haState } from '../HAState'
import { unitSize } from '@/Layout'
import LCARSElement from './LCARSElement.vue'
import LCARSRow from './LCARSRow.vue'

const {
  entity,
  attribute,
  width = 10,
  height = 3,
  color = 'periwinkle',
  bgColor = 'golden-tainoi',
  stroke = 2,
  min = 0,
  max = 100,
  tickInterval = 10,
} = defineProps<{
  entity: string
  attribute: string
  width?: number
  height?: number
  color?: string
  bgColor?: string
  stroke?: number
  min?: number
  max?: number
  tickInterval?: number
}>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getData(state: any) {
  const value = getValue(state)
  return {
    width: unitSize(width),
    height: unitSize(height),
    tickWidth: (width * tickInterval) / (max - min),
    tickCount: (max - min) / tickInterval,
    value,
    valueX: ((value - min) * width) / (max - min),
  }
}

const data = computed(() => {
  return getData(haState.value)
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getValue(state: any) {
  if (!state?.states) {
    return min
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entityObject: any = state.states[entity]

  if (!entityObject?.attributes) {
    return min
  }

  return entityObject.attributes[attribute]
}

const reactiveValue = reactive({ number: 0 })
const reactiveValueX = reactive({ number: 0 })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function animateValue(newData: any) {
  gsap.to(reactiveValue, { duration: 1, number: newData.value })
  gsap.to(reactiveValueX, { duration: 1, number: newData.valueX })
}

watch(
  () => getValue(haState.value),
  (v) => {
    if (v) {
      const newData = getData(haState.value)
      animateValue(newData)
    }
  },
)

animateValue(data.value)
</script>
<template>
  <LCARSElement
    :color="bgColor"
    style="position: absolute; top: 0; left: 0"
    :width="reactiveValueX.number"
    :height="height"
  />
  <LCARSRow style="align-content: space-between">
    <LCARSElement
      v-for="n in data.tickCount"
      :width="data.tickWidth"
      :height="height"
      :style="{
        borderStyle: 'solid',
        borderWidth: `${stroke}px`,
        borderColor: color,
        boxSizing: 'border-box',
        zIndex: 1,
      }"
    />
  </LCARSRow>
</template>
