<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import LCARSElement from './LCARSElement.vue'
import LCARSRow from './LCARSRow.vue'
import { findByPath, type NavItem } from '@/NavItem'
import { getThemeColor } from '@/ThemeConfig'
import gsap from 'gsap'
import type { Animations } from '@/AnimationConfig'
import type { HAConfig } from '@/HAConfig'

defineOptions({
  inheritAttrs: false,
})

const {
  textColor = 'black',
  rootPath,
  navToFirstChild = false,
  gap,
  animations,
  config,
} = defineProps<{
  textColor?: string | number
  rootPath?: string
  navToFirstChild?: boolean
  gap?: number
  animations?: Animations
  config?: HAConfig
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
  const rootItem = findByPath(rootPath ?? '/')

  if (!rootItem) {
    return
  }

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
  <LCARSRow :gap="gap">
    <LCARSElement
      v-for="(item, index) in visibleItems"
      :key="item.text"
      :nav="getNavPath(item)"
      :text="item.text"
      :textColor="textColor"
      :color="getThemeColor(config?.theme, index + 1)"
      v-bind="$attrs"
      >{{ item.text }}</LCARSElement
    >
  </LCARSRow>
</template>
