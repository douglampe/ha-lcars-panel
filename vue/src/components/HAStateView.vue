<script setup lang="ts">
import { haState, loadTestState } from '../HAState'
import LCARSElement from './LCARSElement.vue'
</script>

<template>
  <div class="lcars-column">
    <LCARSElement class="lcars-u-2 rounded centered" @click="loadTestState()"
      >Load Test State</LCARSElement
    >
    <pre style="text-transform: none; overflow-y: scroll; flex: 1">{{ haState.states }}</pre>
  </div>
</template>
