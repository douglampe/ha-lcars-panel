<script setup lang="ts">
import LCARSElement from './LCARSElement.vue'

const { animation } = defineProps<{ animation?: string }>()
</script>

<template>
  <LCARSElement>
    <table class="lcars-table" :class="animation">
      <slot></slot>
    </table>
  </LCARSElement>
</template>
