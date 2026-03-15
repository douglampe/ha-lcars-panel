<script setup lang="ts">
import { computed } from 'vue'
import LCARSElement from './LCARSElement.vue'
import { haConfig } from '@/HAConfig'
import { findByPath, type NavItem } from '@/NavItem'
import { getTheme, getThemeColor } from '@/ThemeConfig'
import LCARSCol from './LCARSCol.vue'

defineOptions({
  inheritAttrs: false,
})

const {
  width,
  textColor = 'black',
  rootPath,
  height,
  navToFirstChild = false,
  gap,
  alignContent,
} = defineProps<{
  width?: number
  height?: number
  textColor?: string
  rootPath?: string
  navToFirstChild?: boolean
  gap?: number
  alignContent?: string
}>()

const theme = getTheme()

const items = computed(() => {
  if (!haConfig.value?.nav) {
    return []
  }
  const rootItem = findByPath(rootPath ?? '/')
  return rootItem?.children || []
})

function getNavPath(item: NavItem) {
  if (navToFirstChild && item.children && item.children.length > 0) {
    return item.children[0].path
  }
  return item.path
}
</script>

<template>
  <LCARSCol :gap="gap">
    <LCARSElement
      v-for="(item, index) in items"
      :key="item.text"
      :nav="getNavPath(item)"
      :text="item.text"
      :textColor="textColor"
      :width="width"
      :height="height"
      :color="getThemeColor(index)"
      >{{ item.text }}</LCARSElement
    >
  </LCARSCol>
</template>
