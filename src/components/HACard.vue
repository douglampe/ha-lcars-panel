<script setup lang="ts">
import { haCards } from '@/HAConfig'
import { onMounted, ref } from 'vue'

const { cardIndex } = defineProps<{ cardIndex: number }>()

const cardRef = ref()

onMounted(() => {
  if (cardIndex < haCards.value?.length) {
    cardRef.value.appendChild(haCards.value[cardIndex])
  }
})
</script>

<template>
  <div ref="cardRef"></div>
</template>
