<script setup lang="ts">
import { onMounted } from 'vue'
import { haConfig, loadVariables } from './HAConfig'
import RecursiveComponent from './components/RecursiveComponent.vue'

onMounted(() => {
  loadVariables()
})
</script>

<template>
  <div class="lcars-wrapper">
    <RecursiveComponent :children="haConfig.children" />
  </div>
</template>

<style lang="sass">
@use './styles/colors'
@use './styles/main'
@use './styles/table'

.lcars-wrapper
  background-color: var(--lcars-color-default-bg)
  color: var(--lcars-color-default-text)
  font-family: Antonio, "Arial", monospace
  text-transform: uppercase
</style>
