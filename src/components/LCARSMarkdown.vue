<script setup lang="ts">
import { marked } from 'marked'
import { computed } from 'vue'

const { content } = defineProps<{ content: string }>()

const html = computed(() => {
  return marked.parse(content)
})
</script>

<template>
  <div v-html="html"></div>
</template>
