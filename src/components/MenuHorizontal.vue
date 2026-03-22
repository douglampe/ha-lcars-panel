<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import LCARSElement from './LCARSElement.vue'
import LCARSRow from './LCARSRow.vue'
import { haConfig } from '@/HAConfig'
import { findByPath, type NavItem } from '@/NavItem'
import { getThemeColor } from '@/ThemeConfig'
import gsap from 'gsap'
import type { Animations } from '@/AnimationConfig'

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
  marginTop,
  marginBottom,
  animations,
} = defineProps<{
  width?: number
  height?: number
  textColor?: string | number
  rootPath?: string
  navToFirstChild?: boolean
  gap?: number
  alignContent?: string
  marginTop?: number
  marginBottom?: number
  animations?: Animations
}>()

const visibleCount = reactive({ value: 0 })

const items = ref<NavItem[]>([])

const visibleItems = computed(() => {
  return items.value.slice(0, visibleCount.value)
})

function getNavPath(item: NavItem) {
  if (item.url) {
    return item.url
  }
  if (navToFirstChild && item.children && item.children.length > 0) {
    return item.children[0].path
  }
  return item.path
}

onMounted(() => {
  if (!haConfig.value?.navigation) {
    return
  }

  const rootItem = findByPath(rootPath ?? '/')
  items.value = rootItem?.children ?? []

  if (animations?.in?.length) {
    for (const animation of animations.in) {
      if (animation.type === 'build') {
        gsap.to(visibleCount, {
          duration: (animation.duration ?? 0.1) * items.value.length,
          value: items.value.length,
          ease: `steps(${items.value.length})`,
          delay: animation.delay,
        })
      }
    }
  } else {
    visibleCount.value = items.value.length
  }
})
</script>

<template>
  <LCARSRow :gap="gap" :marginBottom="marginBottom" :marginTop="marginTop">
    <LCARSElement
      v-for="(item, index) in visibleItems"
      :key="item.text"
      :nav="getNavPath(item)"
      :text="item.text"
      :textColor="textColor"
      :width="width"
      :height="height"
      :color="getThemeColor(index)"
      :alignContent="alignContent"
      >{{ item.text }}</LCARSElement
    >
  </LCARSRow>
</template>
