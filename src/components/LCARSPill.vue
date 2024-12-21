<script setup lang="ts">
import LCARSElement from './LCARSElement.vue'

const {
  color,
  width = 3,
  textColor = 'black',
  textAlign = 'middle-center',
} = defineProps<{ color?: string; width?: number; textColor?: string; textAlign?: string }>()
</script>

<template>
  <LCARSElement
    :color="color"
    :text-color="textColor"
    :width="width"
    :height="1"
    :cap-left="true"
    :cap-right="true"
    :text-align="textAlign"
    ><slot></slot>
  </LCARSElement>
</template>
