<script setup lang="ts">
import { ref } from 'vue'

import { haConfig } from './HAConfig'
import type { MenuItem } from './MenuItem'
import LayoutTests from './components/LayoutTests.vue'
import LCARSMenuPanel from './components/LCARSMenuPanel.vue'
import RecursiveComponent from './components/RecursiveComponent.vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reactiveMenuItem = ref({} as any)

function onSelect(item: MenuItem) {
  reactiveMenuItem.value = item
}
</script>

<template>
  <div class="lcars-card lcars-wrapper">
    <div class="lcars-row fill">
      <LCARSMenuPanel @select="onSelect">
        <RecursiveComponent :items="reactiveMenuItem.items" />
      </LCARSMenuPanel>
    </div>
  </div>
</template>

<style lang="sass">
@use './styles/main'
</style>
