<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { haConfig } from '@/HAConfig'
import { findByPath } from '@/NavItem'
import RemoteConfig from './RemoteConfig.vue'
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

  return undefined
})

watch(currentNav, () => {
  renderKey.value++
})
</script>

<template>
  <RemoteConfig v-if="url" :url="url" :key="renderKey" />
</template>
