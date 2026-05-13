<script setup lang="ts">
import type { ConfigItem } from '@/ConfigItem'
import RecursiveComponent from './RecursiveComponent.vue'
import type { HAConfig } from '@/HAConfig'
import { onMounted } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const { children, childPositioning, config } = defineProps<{
  children: ConfigItem[]
  childPositioning?: string
  config: HAConfig
}>()
</script>

<template>
  <RecursiveComponent
    v-for="(child, index) in children"
    :key="index"
    v-bind="child"
    :config="config"
    :positioning="child.positioning ?? childPositioning"
  />
</template>
