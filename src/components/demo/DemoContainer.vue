<script setup lang="ts">
import { navigate, currentNav } from '@/LocalNav'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { children } = defineProps<{ children: any[] }>()

function onClick(path: string) {
  navigate(path)
}
</script>

<style lang="sass">
@use '../../styles/main'
</style>

<template>
  <div class="lcars-wrapper">
    <div>
      <span
        v-for="child in children"
        :key="child.type"
        class="lcars-element rounded button"
        :style="{
          backgroundColor: currentNav.endsWith(child.showForNv)
            ? 'var(--lcars-color-golden-tanoi)'
            : 'var(--lcars-color-neon-carrot)',
        }"
        @click="onClick(child.showForNav)"
        >{{ child.props.title }}</span
      >
      <span
        class="lcars-element rounded button lcars-color-neon-carrot-bg"
        style="background-color: var(--lcars-color-gray); color: var(--lcars-color-white)"
        @click="onClick('/')"
        >Exit</span
      >
    </div>
  </div>
</template>
