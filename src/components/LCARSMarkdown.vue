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
