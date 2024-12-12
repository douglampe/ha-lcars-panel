<script setup lang="ts">
import { defineEmits } from 'vue'
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
    <div class="lcars-u-1-minus lcars-row">
      <LCARSElement
        :left="true"
        :rounded="true"
        :cap="true"
        :bgColor="color"
        color="#000"
        style="margin-left: 1vw"
      ></LCARSElement>
      <div class="lcars-text-element centered fill">
        <span v-if="icon" v-html="icon" :style="{ color: color }"></span
        ><span v-else :style="{ color: color }">{{ index }}</span>
      </div>
    </div>
    <LCARSElement
      class="lcars-u-2-minus"
      :bgColor="color"
      color="var(--color-black)"
      :href="href ?? ''"
    >
      {{ title }}
    </LCARSElement>
  </component>
</template>
