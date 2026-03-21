<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import LCARSElement from './LCARSElement.vue'
import { haConfig } from '@/HAConfig'
import { findByPath, type NavItem } from '@/NavItem'
import { getThemeColor } from '@/ThemeConfig'
import LCARSCol from './LCARSCol.vue'
import type { Animations } from '@/AnimationConfig'
import gsap from 'gsap'

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
  marginLeft,
  marginRight,
  animations,
} = defineProps<{
  width?: number
  height?: number
  textColor?: string | number
  rootPath?: string
  navToFirstChild?: boolean
  gap?: number
  alignContent?: string
  marginLeft?: number
  marginRight?: number
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
  if (!haConfig.value?.nav) {
    return
  }

  const rootItem = findByPath(rootPath ?? '/')
  items.value = rootItem?.children ?? []

  if (animations?.in?.length) {
    for (const animation of animations.in) {
      if (animation.type === 'build-down') {
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
  <LCARSCol :gap="gap" :margintLeft="marginLeft" :marginRight="marginRight">
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
  </LCARSCol>
</template>
