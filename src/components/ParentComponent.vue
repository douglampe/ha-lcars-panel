<script setup lang="ts">
import type { ConfigItem } from '@/ConfigItem'
import RecursiveComponent from './RecursiveComponent.vue'

defineOptions({
  inheritAttrs: false,
})

const { children, childPositioning } = defineProps<{
  children: ConfigItem[]
  childPositioning?: string
}>()
</script>

<template>
  <RecursiveComponent
    v-for="(child, index) in children"
    :key="index"
    v-bind="child"
    :positioning="child.positioning ?? childPositioning"
  />
</template>
