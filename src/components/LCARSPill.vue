<script setup lang="ts">
import { onMounted, useAttrs } from 'vue'
import LCARSElement from './LCARSElement.vue'
import type { Animations } from '@/AnimationConfig'

const {
  color,
  width = 3,
  textColor = 'black',
  alignContent = 'middle-center',
  animations,
} = defineProps<{
  color?: string | number
  width?: number
  textColor?: string | number
  alignContent?: string
  animations?: Animations
}>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <LCARSElement
    :color="color"
    :text-color="textColor"
    :width="width"
    :height="1"
    :cap-left="true"
    :cap-right="true"
    :align-content="alignContent"
    :animations="animations"
    v-bind="$attrs"
  >
    <slot></slot>
  </LCARSElement>
</template>
