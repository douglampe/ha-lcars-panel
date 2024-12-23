<script setup lang="ts">
import { marked } from 'marked'
import { computed } from 'vue'

const { content } = defineProps<{ content: string }>()

const html = computed(() => {
  if (content) {
    return marked.parse(content)
  }
})
</script>

<template>
  <div v-if="html" v-html="html"></div>
</template>
