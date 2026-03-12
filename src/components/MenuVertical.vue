<script setup lang="ts">
import { computed } from 'vue'
import LCARSElement from './LCARSElement.vue'
import LCARSRow from './LCARSRow.vue'
import { haConfig } from '@/HAConfig'
import { findByPath, type NavItem } from '@/NavItem'
import { getTheme } from '@/ThemeConfig'

defineOptions({
  inheritAttrs: false,
})

const {
  width,
  textColor = 'black',
  rootPath = '/',
  height,
  navToFirstChild = false,
} = defineProps<{
  width?: number
  height?: number
  textColor?: string
  rootPath?: string
  navToFirstChild?: boolean
}>()

const theme = getTheme()

const items = computed(() => {
  if (!haConfig.value?.nav) {
    return []
  }
  const rootItem = findByPath(rootPath)
  return rootItem?.children || []
})

function themeColor(index: number) {
  return theme[index % theme.length]
}

function getNavPath(item: NavItem) {
  if (navToFirstChild && item.children && item.children.length > 0) {
    return item.children[0].path
  }
  return item.path
}
</script>

<template>
  <LCARSRow v-for="(item, index) in items" :key="item.text">
    <LCARSElement
      :nav="getNavPath(item)"
      :text="item.text"
      :textColor="textColor"
      :width="width"
      :height="height"
      :color="themeColor(index)"
      >{{ item.text }}</LCARSElement
    >
  </LCARSRow>
</template>
