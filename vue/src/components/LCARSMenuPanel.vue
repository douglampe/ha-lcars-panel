<script setup lang="ts">
import { computed, ref } from 'vue'

import { currentNav } from '@/LocalNav'
import type { MenuItem } from '../MenuItem'
import LeftBracketMenu from './LeftBracketMenu.vue'
import CPanel from './CPanel.vue'

const reactiveTitle = ref('HOME')
const reactiveColor = ref('var(--lcars-color-gray-blue)')

const emit = defineEmits<{
  (e: 'select', item: MenuItem): void
}>()

const title = computed(() => {
  return currentNav.value?.split('/').pop()
})

function onSelect(item: MenuItem) {
  reactiveTitle.value = item?.title ?? 'HOME'
  reactiveColor.value = item?.color ?? 'var(--lcars-color-gray-blue)'
  emit('select', item)
}
</script>

<style lang="sass">
@use '../styles/main'
</style>

<template>
  <div class="lcars-row lcars-wmax">
    <LeftBracketMenu @select="onSelect">
      <slot name="left"></slot>
    </LeftBracketMenu>
    <div class="lcars-col lcars-w-unit"></div>
    <CPanel
      :title="title"
      :color="reactiveColor"
      :leftColor="reactiveColor"
      :topCap="true"
      :bottomCap="true"
      :fillWidth="true"
      :fillHeight="true"
      style="min-height: calc(var(--lcars-unit) * 10)"
    >
      <slot></slot>
    </CPanel>
  </div>
</template>
