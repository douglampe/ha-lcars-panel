<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import gsap from 'gsap'

import { getStateValue, haState } from '@/HAState'
import LCARSElement from './LCARSElement.vue'

const {
  entity,
  attribute = 'state',
  color,
  textColor,
  min = 0,
  max = 100,
} = defineProps<{
  entity: string
  attribute?: string
  color?: string
  textColor?: string
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
  <LCARSElement
    :color="color"
    :text-color="textColor"
    :style="{
      filter: `brightness(${reactiveValue.number})`,
    }"
  >
    <slot></slot>
  </LCARSElement>
</template>
