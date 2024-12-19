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
    <RecursiveComponent v-bind="haConfig" :type="undefined" />
  </div>
</template>

<style lang="sass">
@use './styles/main'
</style>
