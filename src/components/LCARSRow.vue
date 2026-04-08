<script setup lang="ts">
import { gapSize, marginStyle, padStyle, removeUndefined, unitSize } from '@/Layout'
import type { MarginProps } from '@/props/MarginProps'
import type { PadProps } from '@/props/PadProps'
import { computed } from 'vue'

interface Props extends MarginProps, PadProps {
  height?: number | string
  width?: number | string
  fill?: boolean
  stretch?: boolean
  right?: boolean
  bottom?: boolean
  gap?: number
  wrap?: boolean
  justifyContent?: string
  alignItems?: string
}

const config = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})

const style = computed(() => {
  return removeUndefined({
    height: unitSize(config.height),
    width: unitSize(config.width),
    margin: marginStyle(config),
    padding: padStyle(config),
    flex: config.fill ? 1 : undefined,
    justifyContent: config.justifyContent ?? (config.right ? 'flex-end' : undefined),
    alignItems:
      config.alignItems ?? (config.bottom ? 'flex-end' : config.stretch ? 'stretch' : 'flex-start'),
    gap: gapSize(config.gap),
    flexWrap: config.wrap ? 'wrap' : undefined,
  })
})
</script>

<template>
  <div style="display: flex; flex-direction: row" :style="style"><slot></slot></div>
</template>
