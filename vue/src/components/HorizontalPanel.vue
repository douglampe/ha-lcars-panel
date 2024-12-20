<script setup lang="ts">
import { computed } from 'vue'
const { hollow, color } = defineProps({
  hollow: {
    type: Boolean,
  },
  color: {
    type: String,
    default() {
      return 'golden-tanoi'
    },
  },
})
const bracketStyle = computed(() => {
  return {
    backgroundColor: hollow ? 'transparent' : color,
    borderColor: hollow ? color : 'transparent',
  }
})
const containerStyle = computed(() => {
  return {
    paddingTop: hollow ? '2vw' : '0',
    paddingBottom: hollow ? '2vw' : '0',
    marginLeft: hollow ? '-2vw' : '0',
    marginRight: hollow ? '-2vw' : '0',
  }
})
</script>

<template>
  <div class="lcars-row" style="margin: 0.5vw">
    <div class="lcars-bracket left" :class="{ hollow: hollow }" :style="bracketStyle"></div>
    <div class="lcars-col" :style="containerStyle"><slot></slot></div>
    <div class="lcars-bracket right" :class="{ hollow: hollow }" :style="bracketStyle"></div>
  </div>
</template>
