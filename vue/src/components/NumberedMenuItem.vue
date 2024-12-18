<script setup lang="ts">
import type { MenuItem } from '../MenuItem'
const props: MenuItem = defineProps<MenuItem>()

const { index, icon, title, color } = props
</script>

<template>
  <div class="lcars-row lcars-el button">
    <div class="lcars-row">
      <div class="lcars-el l-cap-5" :style="{ backgroundColor: color }"></div>
      <div class="lcars-text-element centered lcars-w-unit">
        <span v-if="icon" v-html="icon" :style="{ color: color }"></span
        ><span v-else :style="{ color: color }">{{ index }}</span>
      </div>
    </div>
    <div
      class="lcars-w-2-minus lcars-h-unit lcars-font-7"
      :style="{ backgroundColor: color, color: 'var(--lcars-color-black)' }"
    >
      {{ title }}
    </div>
  </div>
</template>
