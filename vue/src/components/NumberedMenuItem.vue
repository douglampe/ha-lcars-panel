<script setup lang="ts">
import LCARSElement from './LCARSElement.vue'
import type { MenuItem } from '../MenuItem'
const props: MenuItem = defineProps<MenuItem>()

defineEmits<{
  (e: 'select', item: MenuItem): void
}>()
const { index, icon, title, color, href } = props
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    class="lcars-row"
    @click="$emit('select', props)"
  >
    <div class="lcars-row">
      <div class="lcars-cap-left" :style="{ backgroundColor: color }"></div>
      <div class="lcars-text-element centered lcars-w-unit">
        <span v-if="icon" v-html="icon" :style="{ color: color }"></span
        ><span v-else :style="{ color: color }">{{ index }}</span>
      </div>
    </div>
    <LCARSElement
      class="lcars-w-2-minus lcars-h-unit"
      :bgColor="color"
      color="var(--lcars-color-black)"
      :href="href ?? ''"
    >
      {{ title }}
    </LCARSElement>
  </component>
</template>
