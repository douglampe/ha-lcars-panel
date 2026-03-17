<script setup lang="ts">
import { marked } from 'marked'
import { computed } from 'vue'
import LCARSElement from './LCARSElement.vue'

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
