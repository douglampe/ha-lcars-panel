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
@use './styles/main'
</style>
