<script setup lang="ts">
import type { ConfigItem } from '@/ConfigItem'
import RecursiveComponent from './RecursiveComponent.vue'

defineOptions({
  inheritAttrs: false,
})

const { children } = defineProps<{ children: ConfigItem[] }>()
</script>

<template>
  <RecursiveComponent v-for="(child, index) in children" :key="index" v-bind="child" />
</template>
