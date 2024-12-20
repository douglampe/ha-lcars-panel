<script setup lang="ts">
import { computed } from 'vue'
const { color, hollow, rotated } = defineProps({
  color: {
    type: String,
    default() {
      return 'golden-tanoi'
    },
  },
  hollow: {
    type: Boolean,
  },
  rotated: {
    type: Boolean,
  },
})
const bracketStyle = computed(() => {
  return {
    backgroundColor: hollow ? 'transparent' : color,
    borderColor: hollow ? color : 'transparent',
  }
})
const containerStyle = computed(() => {
  if (hollow && rotated) {
    return {
      marginTop: '-2vw',
      marginBottom: '-2vw',
      marginLeft: '2vw',
      marginRight: '2vw',
    }
  }
  if (hollow) {
    return {
      paddingLeft: '2vw',
      paddingRight: '2vw',
      marginTop: '-2vw',
      marginBottom: '-2vw',
    }
  }
  return {
    paddingLeft: '0',
    paddingRight: '0',
    marginTop: '0',
    marginBottom: '0',
  }
})
</script>

<template>
  <div class="lcars-col" style="margin: 0.5vw">
    <div class="lcars-bracket top" :class="{ hollow: hollow }" :style="bracketStyle"></div>
    <div class="lcars-col" :style="containerStyle">
      <slot></slot>
    </div>
    <div class="lcars-bracket bottom" :class="{ hollow: hollow }" :style="bracketStyle"></div>
  </div>
</template>
