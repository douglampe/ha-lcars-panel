<script setup lang="ts">
import { ref } from 'vue'

import { isDemoVisible } from './HAConfig'
import type { MenuItem } from './MenuItem'
import DemoContainer from './components/demo/DemoContainer.vue'
import LCARSMenuPanel from './components/LCARSMenuPanel.vue'
import RecursiveComponent from './components/RecursiveComponent.vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reactiveMenuItem = ref({} as any)

function onSelect(item: MenuItem) {
  reactiveMenuItem.value = item
}
</script>

<template>
  <DemoContainer v-if="isDemoVisible()" />
  <div v-else class="lcars-wrapper">
    <LCARSMenuPanel @select="onSelect">
      <RecursiveComponent :items="reactiveMenuItem.items" />
    </LCARSMenuPanel>
  </div>
</template>

<style lang="sass">
@use './styles/main'
</style>
