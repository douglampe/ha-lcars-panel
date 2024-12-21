<script setup lang="ts">
import { computed } from 'vue'

const { stroke, color } = defineProps(['stroke', 'color'])

const size = computed(() => {
  return {
    dotSize: stroke * 5 + 'px',
    dotMargin: stroke * 2 + 'px',
  }
})
</script>
<template>
  <div
    :style="{
      backgroundColor: color,
      width: size.dotSize,
      height: size.dotSize,
      borderRadius: size.dotMargin,
    }"
  >
    &nbsp;
  </div>
  <div
    style="flex: 1"
    :style="{ backgroundColor: color, marginTop: size.dotMargin, height: stroke + 'px' }"
  >
    &nbsp;
  </div>
  <div
    :style="{
      backgroundColor: color,
      width: size.dotSize,
      height: size.dotSize,
      borderRadius: size.dotMargin,
    }"
  >
    &nbsp;
  </div>
</template>
