<script setup lang="ts">
import { computed } from 'vue'
import LCARSElement from './LCARSElement.vue'
import LCARSRow from './LCARSRow.vue'
import { haConfig } from '@/HAConfig'
import { findByPath, type NavItem } from '@/NavItem'
import Remote from './Remote.vue'
import { currentNav } from '@/LocalNav'

defineOptions({
  inheritAttrs: false,
})

const { rootPath = '/' } = defineProps<{
  rootPath?: string
}>()

const items = computed<NavItem[]>(() => {
  if (!haConfig.value?.nav) {
    return [] as NavItem[]
  }
  const rootItem = findByPath(rootPath)
  return (
    rootItem?.children?.filter((i) => !i.path || currentNav?.value.startsWith(i.path)) ||
    ([] as NavItem[])
  )
})
</script>

<template>
  <Remote v-for="(item, index) in items" :key="index" :url="item.url ?? `~${item.path}.yaml?raw`" />
</template>
