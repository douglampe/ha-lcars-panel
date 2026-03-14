<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { haConfig } from '@/HAConfig'
import { findByPath } from '@/NavItem'
import RemoteConfig from './RemoteConfig.vue'
import { currentNav } from '@/LocalNav'

defineOptions({
  inheritAttrs: false,
})

const renderKey = ref(0)
const url = ref<string>()
const myNav = ref<string>()

const { rootPath = '/', id } = defineProps<{
  rootPath?: string
  id?: string
}>()

function setUrl() {
  if (!haConfig.value?.nav) {
    return undefined
  }
  const rootItem = findByPath(rootPath)
  const item = rootItem?.children?.find((i) => !i.path || currentNav.value?.startsWith(i.path))
  if (item && item.path !== myNav.value) {
    myNav.value = item.path

    url.value = item.url
      ? item.url.replace('~', haConfig.value?.remoteRoot ?? import.meta.env.BASE_URL)
      : `${haConfig.value?.remoteRoot ?? import.meta.env.BASE_URL}${item.path}.yaml?raw`
    renderKey.value++
  }
}

watch(currentNav, () => {
  setUrl()
})

onMounted(() => {
  setUrl()
})
</script>

<template>
  <RemoteConfig v-if="url" :url="url" :key="renderKey" :id="id" />
</template>
