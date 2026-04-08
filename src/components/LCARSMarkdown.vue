<script setup lang="ts">
import { marked } from 'marked'
import { computed, onMounted, reactive } from 'vue'
import LCARSElement from './LCARSElement.vue'
import type { AnimationConfig } from '@/AnimationConfig'
import gsap from 'gsap'
import { haConfig } from '@/HAConfig'

marked.use({
  renderer: {
    link: ({ href, title, text }) => {
      const external = href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''
      return `<a href="${href}"${title ? `'title="${title}"` : ''}${external}>${text}</a>`
    },
  },
})

const { content, textAnimation } = defineProps<{
  content?: string
  textAnimation?: AnimationConfig
}>()
const animated = reactive<{ typeLength?: number }>({})

defineOptions({
  inheritAttrs: false,
})

const html = computed(() => {
  if (content) {
    const displayContent =
      textAnimation?.type === 'typing' ? content.substring(0, animated.typeLength ?? 0) : content
    if (!new RegExp(/\n\n|\n-|```/g).test(content.trim())) {
      return marked.parseInline(displayContent, { async: false })
    }
    return marked.parse(displayContent, { async: false })
  }
  return undefined
})

onMounted(() => {
  animated.typeLength = (content ?? '').length
  if (textAnimation?.type === 'typing' && !haConfig.value.disableAnimations) {
    const targetLength = animated.typeLength
    animated.typeLength = 0
    gsap.to(animated, {
      duration: (textAnimation.duration ?? 0.05) * targetLength,
      delay: textAnimation.delay,
      typeLength: targetLength,
    })
  }
})
</script>

<template>
  <LCARSElement v-bind="$attrs">
    <div v-if="html" v-html="html"></div>
  </LCARSElement>
</template>
