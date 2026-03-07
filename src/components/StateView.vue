<script setup lang="ts">
import { haState } from '../HAState'
import LCARSElement from './LCARSElement.vue'

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div class="lcars-col">
    <LCARSElement class="lcars-w-2 rounded centered""
      >Load Test State</LCARSElement
    >
    <pre style="text-transform: none; overflow-y: scroll; flex: 1">{{ haState.states }}</pre>
  </div>
</template>
