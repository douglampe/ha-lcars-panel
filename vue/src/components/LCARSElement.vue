<script setup lang="ts">
import { computed } from 'vue'
const { color, bgColor, right, left, rounded, button, addition, decorator, cap } = defineProps({
  color: {
    type: String,
    default() {
      return 'var(--lcars-color-default-bg)'
    },
  },
  bgColor: {
    type: String,
    default() {
      return 'var(--lcars-color-golden-tanoi)'
    },
  },
  right: {
    type: Boolean,
  },
  left: {
    type: Boolean,
  },
  rounded: {
    type: Boolean,
  },
  button: {
    type: Boolean,
  },
  addition: {
    type: Boolean,
  },
  decorator: {
    type: Boolean,
  },
  cap: {
    type: Boolean,
  },
  href: {
    type: String,
  },
})
const classes = computed(() => {
  return {
    right: right,
    'left-rounded': left && rounded,
    'right-rounded': right && rounded,
    rounded: rounded && !left && !right,
    button: button,
    'lcars-element-addition': addition,
    'lcars-element-decorator': decorator,
    cap: cap,
  }
})
const style = computed(() => {
  return { backgroundColor: bgColor, color: color }
})
</script>
<template>
  <div class="lcars-element" :style="style" :class="classes">
    <slot></slot>
  </div>
</template>
