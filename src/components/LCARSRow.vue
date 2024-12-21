<script setup lang="ts">
import { gapSize, marginStyle, padStyle, removeUndefined } from '@/Layout'
import type { MarginProps } from '@/props/MarginProps'
import type { PadProps } from '@/props/PadProps'
import { computed } from 'vue'

interface Props extends MarginProps, PadProps {
  fill?: boolean
  stretch?: boolean
  right?: boolean
  bottom?: boolean
  gap?: number
}

const config = defineProps<Props>()

const style = computed(() => {
  return removeUndefined({
    margin: marginStyle(config),
    padding: padStyle(config),
    flex: config.fill ? 1 : undefined,
    justifyContent: config.right ? 'flex-end' : undefined,
    alignItems: config.bottom ? 'flex-end' : config.stretch ? 'stretch' : '',
    gap: gapSize(config.gap),
  })
})
</script>

<template>
  <div style="display: flex; flex-direction: row" :style="style"><slot></slot></div>
</template>
