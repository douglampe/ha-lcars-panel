<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import gsap from 'gsap'

import { getStateValue, haState } from '@/HAState'
import LCARSElement from './LCARSElement.vue'
import { haConfig } from '@/HAConfig'

const {
  entity,
  attribute = 'state',
  color,
  textColor,
  min = 0,
  max = 100,
} = defineProps<{
  entity?: string
  attribute?: string
  color?: string | number
  textColor?: string | number
  min?: number
  max?: number
}>()

function brightnessFactor() {
  if (!entity) {
    return 1
  }
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

if (!haConfig.value?.vars?.disableWatchers) {
  watch(
    () => (entity ? getStateValue(haState.value, entity, attribute) : undefined),
    (v) => {
      if (v) {
        const newData = brightnessFactor()
        animateValue(newData)
      }
    },
  )
}

animateValue(brightness.value)
</script>
<template>
  <LCARSElement
    :color="color"
    :text-color="textColor"
    :style="{
      filter: `brightness(${reactiveValue.number})`,
    }"
    v-bind="$attrs"
  >
    <slot></slot>
  </LCARSElement>
</template>
