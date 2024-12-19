<script setup lang="ts">
import { haConfig } from './HAConfig'
import RecursiveComponent from './components/RecursiveComponent.vue'
</script>

<template>
  <div class="lcars-wrapper">
    <RecursiveComponent v-bind="haConfig" :type="undefined" />
  </div>
</template>

<style lang="sass">
@use './styles/main'
</style>
