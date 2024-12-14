<script setup lang="ts">
import { haConfig, showDemo } from '@/HAConfig'
import LayoutsDemo from './LayoutsDemo.vue'
import TextDemo from './TextDemo.vue'
import ElementsDemo from './ElementDemo.vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const demoComponents: Record<string, any> = {
  layout: LayoutsDemo,
  text: TextDemo,
  elements: ElementsDemo,
}
</script>

<style lang="sass">
@use '../../styles/main'
</style>

<template>
  <div class="lcars-wrapper">
    <div v-if="!haConfig.demo?.fullScreen">
      <span
        v-for="[key, _value] in Object.entries(demoComponents)"
        :key="key"
        class="lcars-element rounded button"
        :style="{
          backgroundColor:
            haConfig.demo?.main === key
              ? 'var(--lcars-color-golden-tanoi)'
              : 'var(--lcars-color-neon-carrot)',
        }"
        @click="showDemo({ main: key })"
        >{{ key }}</span
      >
      <span
        class="lcars-element rounded button lcars-color-neon-carrot-bg"
        style="background-color: var(--lcars-color-gray); color: var(--lcars-color-white)"
        @click="showDemo({ main: 'none' })"
        >Exit</span
      >
    </div>
    <component :is="demoComponents[haConfig.demo?.main ?? 'layout']"></component>
  </div>
</template>
