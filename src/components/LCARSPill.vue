<script setup lang="ts">
import LCARSElement from './LCARSElement.vue'

const {
  color,
  width = 3,
  textColor = 'black',
  alignContent = 'middle-center',
} = defineProps<{
  color?: string
  width?: number
  textColor?: string
  alignContent?: string
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
    v-bind="$attrs"
  >
    <slot></slot>
  </LCARSElement>
</template>
