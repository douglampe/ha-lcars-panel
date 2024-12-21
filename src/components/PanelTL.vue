<script setup lang="ts">
import type { MarginProps } from '@/props/MarginProps'
import type { ElementProps } from '../props/ElementProps'
import LCARSCol from './LCARSCol.vue'
import LCARSElement from './LCARSElement.vue'
import LCARSRow from './LCARSRow.vue'

interface PanelTLProps extends MarginProps {
  title?: string
  color: string
  fillWidth?: boolean
  fillHeight?: boolean
  gap?: number
  leftWidth?: number
  leftPad?: number
  leftColor?: string
  topCap?: boolean
  bottomCap?: boolean
  topHeight?: number
  outerRadX?: number
  outerRadY?: number
  innerRadX?: number
  innerRadY?: number
}

const {
  title,
  color,
  fillWidth,
  fillHeight,
  gap = 1,
  leftWidth = 3,
  leftPad = 1,
  topHeight = 1,
  outerRadX = 2,
  outerRadY = 2,
  innerRadX = 1,
  innerRadY = 1,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
} = defineProps<PanelTLProps>()
</script>

<template>
  <LCARSRow
    :fill="fillHeight"
    :margin-top="marginTop"
    :margin-left="marginLeft"
    :margin-right="marginRight"
  >
    <LCARSElement
      :rad-x-top-left="outerRadX"
      :rad-y-top-left="outerRadY"
      :rad-x-inner-top-left="innerRadX"
      :rad-y-inner-top-left="innerRadY"
      :color="color"
      :width="leftWidth + innerRadX"
      :height="topHeight + innerRadY"
    ></LCARSElement>
    <LCARSRow :fill="fillWidth" :gap="gap">
      <LCARSElement :fill="fillWidth" :color="color" :height="topHeight"></LCARSElement>
      <slot name="top"></slot>
    </LCARSRow>
    <LCARSElement v-if="title" :color="color" :fontSize="topHeight" :lineHeight="topHeight * 0.8">
      {{ title }}
    </LCARSElement>
    <LCARSElement v-if="topCap" :height="topHeight" :color="color" :cap-right="true"></LCARSElement>
  </LCARSRow>
  <LCARSRow
    :fill="fillHeight"
    :margin-left="marginLeft"
    :margin-right="marginRight"
    :margin-bottom="marginBottom"
  >
    <LCARSCol stretch :gap="gap">
      <slot name="left"></slot>
      <LCARSElement :fill="fillHeight" :color="leftColor" :width="leftWidth"></LCARSElement>
      <LCARSElement v-if="bottomCap" :cap-bottom="true" :color="color"></LCARSElement>
    </LCARSCol>
    <LCARSCol :fill="fillWidth" :margin-left="leftPad">
      <slot></slot>
    </LCARSCol>
  </LCARSRow>
</template>

<style lang="sass">
@use '@/styles/main'
</style>
