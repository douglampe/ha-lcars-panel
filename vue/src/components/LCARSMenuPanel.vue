<script setup lang="ts">
import { ref } from 'vue'

import type { MenuItem } from '../MenuItem'
import LeftBracketMenu from './LeftBracketMenu.vue'
import CPanel from './CPanel.vue'

const reactiveTitle = ref('HOME')
const reactiveColor = ref('var(--color-gray-blue)')

const { items } = defineProps<{ items: MenuItem[] }>()

const emit = defineEmits<{
  (e: 'select', item: MenuItem): void
}>()

function onSelect(item: MenuItem) {
  reactiveTitle.value = item?.title ?? 'HOME'
  reactiveColor.value = item?.color ?? 'var(--color-gray-blue)'
  emit('select', item)
}
</script>

<style lang="sass">
@use '../styles/main'
</style>

<template>
  <LeftBracketMenu :items="items" @select="onSelect"></LeftBracketMenu>
  <div class="lcars-column lcars-u-0-plus">&nbsp;</div>
  <CPanel :title="reactiveTitle" :color="reactiveColor" :leftColor="reactiveColor">
    <div class="lcars-row">
      <slot></slot>
    </div>
  </CPanel>
</template>
