<script setup lang="ts">
import { gapSize, marginStyle, padStyle, removeUndefined, unitSize } from '@/Layout'
import type { MarginProps } from '@/props/MarginProps'
import type { PadProps } from '@/props/PadProps'
import { computed } from 'vue'

interface Props extends MarginProps, PadProps {
  width?: number
  fill?: boolean
  stretch?: boolean
  bottom?: boolean
  right?: boolean
  gap?: number
}

const config = defineProps<Props>()

const style = computed(() => {
  return removeUndefined({
    width: unitSize(config.width),
    margin: marginStyle(config),
    padding: padStyle(config),
    flex: config.fill ? 1 : undefined,
    justifyContent: config.bottom ? 'flex-end' : undefined,
    alignItems: config.right ? 'flex-end' : config.stretch ? 'stretch' : '',
    gap: gapSize(config.gap),
  })
})
</script>

<template>
  <div style="display: flex; flex-direction: column" :style="style"><slot></slot></div>
</template>
