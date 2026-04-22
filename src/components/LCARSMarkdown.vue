<script setup lang="ts">
import { marked } from 'marked'
import { computed, onMounted, reactive } from 'vue'
import LCARSElement from './LCARSElement.vue'
import type { AnimationConfig } from '@/AnimationConfig'
import gsap from 'gsap'
import type { HAConfig } from '@/HAConfig'

marked.use({
  renderer: {
    link: ({ href, title, text }) => {
      const external = href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''
      return `<a href="${href}"${title ? `'title="${title}"` : ''}${external}>${text}</a>`
    },
  },
})

const { content, textAnimation, config } = defineProps<{
  content?: string
  textAnimation?: AnimationConfig
  config?: HAConfig
}>()
const animated = reactive<{ typeLength?: number }>({})

defineOptions({
  inheritAttrs: false,
})

function html(typeLength: number | undefined) {
  if (content) {
    const displayContent =
      textAnimation?.type === 'typing' ? content.substring(0, typeLength ?? 0) : content
    if (!new RegExp(/\n\n|\n-|```/g).test(content.trim())) {
      return marked.parseInline(displayContent, { async: false })
    }
    return marked.parse(displayContent, { async: false })
  }
  return undefined
}

onMounted(() => {
  const targetLength = (content ?? '').length
  if (textAnimation?.type === 'typing' && !config?.disableAnimations) {
    animated.typeLength = 0
    gsap.to(animated, {
      duration: (textAnimation.duration ?? 0.05) * targetLength,
      delay: textAnimation.delay,
      typeLength: targetLength,
    })
  } else {
    animated.typeLength = targetLength
  }
})
</script>

<template>
  <LCARSElement v-bind="$attrs" v-if="html(animated.typeLength)">
    <div v-html="html(animated.typeLength)"></div>
  </LCARSElement>
</template>
