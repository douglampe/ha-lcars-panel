<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import gsap from 'gsap'

import { getStateValue, haState } from '../HAState'

const {
  entity,
  attribute = 'state',
  color,
  bgColor = 'var(--lcars-color-active)',
  min = 0,
  max = 100,
} = defineProps<{
  entity: string
  attribute?: string
  color?: string
  bgColor?: string
  min?: number
  max?: number
}>()

function brightnessFactor() {
  const value = getStateValue(haState.value, entity, attribute) ?? min
  return (value - min) / (max - min)
}

const brightness = computed(() => {
  return brightnessFactor()
})

const reactiveValue = reactive({ number: 0 })

function animateValue(newValue: number) {
  gsap.to(reactiveValue, { duration: 1, number: newValue })
}

watch(
  () => getStateValue(haState.value, entity, attribute),
  (v) => {
    if (v) {
      const newData = brightnessFactor()
      animateValue(newData)
    }
  },
)

animateValue(brightness.value)
</script>
<template>
  <div
    :style="{
      backgroundColor: bgColor,
      color: color ?? 'transparent',
      filter: `brightness(${reactiveValue.number})`,
    }"
  >
    <slot></slot>
  </div>
</template>
