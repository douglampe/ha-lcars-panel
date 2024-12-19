<script setup lang="ts">
import { computed } from 'vue'
import DPanel from './DPanel.vue'
import NumberedMenuItem from './NumberedMenuItem.vue'

const {
  color = 'var(--lcars-color-default)',
  accentColor = 'var(--lcars-color-gray)',
  width = 7,
} = defineProps<{ color?: string; accentColor?: string; width?: number }>()

const isDev = computed(() => {
  return import.meta.env.DEV
})

const icon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>exit-to-app</title><path fill="currentColor" d="M19,3H5C3.89,3 3,3.89 3,5V9H5V5H19V19H5V15H3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10.08,15.58L11.5,17L16.5,12L11.5,7L10.08,8.41L12.67,11H3V13H12.67L10.08,15.58Z" /></svg>'
</script>

<template>
  <DPanel :color="color" :right-width="width" :fill-height="true">
    <template #right>
      <div
        class="lcars-el rad-i-tr-1 lcars-h-1"
        :style="{ backgroundColor: accentColor, width: `calc(var(--lcars-unit) * ${width})` }"
      ></div>
      <slot></slot>
      <NumberedMenuItem
        v-if="isDev"
        index="99"
        title="Transporter"
        color="var(--lcars-color-neon-carrot)"
        :icon="icon"
        class="button"
        href="/"
      />
      <div
        class="lcars-el rad-i-br-1 lcars-h-1"
        :style="{ backgroundColor: accentColor, width: `calc(var(--lcars-unit) * ${width})` }"
      ></div>
    </template>
  </DPanel>
</template>
