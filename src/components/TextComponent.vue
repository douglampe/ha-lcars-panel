<script setup lang="ts">
import type { AnimationConfig } from '@/AnimationConfig'
import gsap from 'gsap'
import { computed, onMounted, reactive } from 'vue'

const props = defineProps<{
  text: string
  textAnimation?: AnimationConfig
}>()

const animated = reactive<{
  typeLength?: number
}>({
  typeLength: 0,
})
const displayText = computed(() => {
  return props.text.substring(0, animated.typeLength)
})

onMounted(() => {
  if (props.textAnimation?.type === 'typing') {
    gsap.to(animated, {
      typeLength: props.text.length,
      duration: props.textAnimation?.duration ?? 0.05 * props.text.length,
      delay: props.textAnimation?.delay ?? 0,
      ease: 'none',
    })
  } else {
    animated.typeLength = props.text.length
  }
})
</script>

<template>
  {{ displayText }}
</template>
