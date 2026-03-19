<script setup lang="ts">
import { marked } from 'marked'
import { computed } from 'vue'
import LCARSElement from './LCARSElement.vue'

marked.use({
  renderer: {
    link: ({ href, title, text }) => {
      const external = href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''
      return `<a href="${href}"${title ? `'title="${title}"` : ''}${external}>${text}</a>`
    },
  },
})

const { content } = defineProps<{ content?: string }>()

defineOptions({
  inheritAttrs: false,
})

const html = computed(() => {
  if (content) {
    if (!new RegExp(/\n\n|\n-|```/g).test(content.trim())) {
      return marked.parseInline(content)
    }
    return marked.parse(content)
  }
  return undefined
})
</script>

<template>
  <LCARSElement v-bind="$attrs">
    <div v-if="html" v-html="html"></div>
  </LCARSElement>
</template>
