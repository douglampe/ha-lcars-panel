<script setup lang="ts">
import type { MenuItem } from '../MenuItem'
const props: MenuItem = withDefaults(defineProps<MenuItem>(), { width: 5 })

const { index, icon, title, color, width } = props
</script>

<template>
  <div class="lcars-row lcars-el button">
    <div class="lcars-row">
      <div class="lcars-el l-cap-5" :style="{ backgroundColor: color }"></div>
      <div class="lcars-text-element centered lcars-w-unit">
        <span v-if="icon" v-html="icon" :style="{ color: color }"></span
        ><span
          v-else
          :style="{
            color: color,
            paddingTop: 0,
            fontSize: 'calc(var(--lcars-unit) * 1)',
            lineHeight: 'calc(var(--lcars-unit) * 0.9)',
          }"
          >{{ index }}</span
        >
      </div>
    </div>
    <div
      class="lcars-h-unit"
      :style="{
        width: `calc(var(--lcars-unit) * ${width})`,
        fontSize: 'calc(var(--lcars-unit) * 0.6)',
        lineHeight: 'calc(var(--lcars-unit) * 0.85)',
        backgroundColor: color,
        color: 'var(--lcars-color-black)',
      }"
    >
      {{ title }}
    </div>
  </div>
</template>
