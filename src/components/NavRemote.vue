<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import LCARSElement from './LCARSElement.vue'
import LCARSRow from './LCARSRow.vue'
import { haConfig } from '@/HAConfig'
import { findByPath, type NavItem } from '@/NavItem'
import Remote from './Remote.vue'
import { currentNav } from '@/LocalNav'

defineOptions({
  inheritAttrs: false,
})

const renderKey = ref(0)

const { rootPath = '/' } = defineProps<{
  rootPath?: string
}>()

const url = computed<string | undefined>(() => {
  if (!haConfig.value?.nav) {
    return undefined
  }
  const rootItem = findByPath(rootPath)
  const item = rootItem?.children?.find((i) => !i.path || currentNav?.value.startsWith(i.path))
  if (item) {
    return item.url
      ? item.url.replace('~', haConfig.value?.remoteRoot ?? import.meta.env.BASE_URL)
      : `${haConfig.value?.remoteRoot ?? import.meta.env.BASE_URL}${item.path}.yaml?raw`
  }
})

watch(currentNav, () => {
  renderKey.value++
})
</script>

<template>
  <Remote v-if="url" :url="url" :key="renderKey" />
</template>
